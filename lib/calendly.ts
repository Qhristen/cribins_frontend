import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const {
  CALENDLY_AUTH_BASE_URL,
  CALENDLY_ACCESS_TOKEN,
  CALENDLY_API_BASE_URL,
  CLIENT_SECRET,
  CLIENT_ID
} = process.env;

interface CalendlyRequestConfig {
  headers: {
    Authorization: string;
  };
}

interface AccessTokenResponse {
  access_token: string;
  refresh_token: string;
}

class CalendlyService {
  private accessToken?: string;
  private refreshToken?: string;
  private request: AxiosInstance;
  private requestInterceptor: number;

  constructor() {
    this.request = axios.create({
      baseURL: CALENDLY_API_BASE_URL
    });

    this.requestInterceptor = this.request.interceptors.response.use(
      (res: any) => res,
      this._onCalendlyError
    );
  }

  private requestConfiguration(): CalendlyRequestConfig {
    return {
      headers: {
        Authorization: `Bearer ${this.accessToken}`
      }
    };
  }

  getUserInfo = async (): Promise<any> => {
    const { data }: AxiosResponse = await this.request.get(
      '/users/me',
      this.requestConfiguration()
    );
    return data;
  };

  getUserEventTypes = async (
    userUri: string,
    count = 10,
    pageToken?: string
  ): Promise<any> => {
    let queryParams = [`count=${count}`].join('&');
    if (pageToken) queryParams += `&page_token=${pageToken}`;

    const url = `/event_types?${queryParams}&user=${userUri}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  getUserEventType = async (uuid: string): Promise<any> => {
    const { data }: AxiosResponse = await this.request.get(
      `/event_types/${uuid}`,
      this.requestConfiguration()
    );
    return data;
  };

  getUserScheduledEvents = async (
    userUri: string,
    count = 10,
    pageToken?: string,
    sort?: string,
    status?: string,
    maxStartTime?: string,
    minStartTime?: string
  ): Promise<any> => {
    let queryParams = [`user=${userUri}`, `count=${count}`].join('&');

    if (pageToken) queryParams += `&page_token=${pageToken}`;
    if (sort) queryParams += `&sort=${sort}`;
    if (status) queryParams += `&status=${status}`;
    if (maxStartTime) queryParams += `&max_start_time=${maxStartTime}`;
    if (minStartTime) queryParams += `&min_start_time=${minStartTime}`;

    const url = `/scheduled_events?${queryParams}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  getUserScheduledEvent = async (uuid: string): Promise<any> => {
    const { data }: AxiosResponse = await this.request.get(
      `/scheduled_events/${uuid}`,
      this.requestConfiguration()
    );
    return data;
  };

  getUserScheduledEventInvitees = async (
    uuid: string,
    count = 10,
    pageToken?: string
  ): Promise<any> => {
    let queryParams = [`count=${count}`].join('&');
    if (pageToken) queryParams += `&page_token=${pageToken}`;

    const url = `/scheduled_events/${uuid}/invitees?${queryParams}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  getUserEventTypeAvailTimes = async (
    eventUri: string,
    startTime: string,
    endTime: string
  ): Promise<any> => {
    const queryParams = [
      `start_time=${startTime}`,
      `end_time=${endTime}`,
      `event_type=${eventUri}`
    ].join('&');

    const url = `/event_type_available_times?${queryParams}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  getUserBusyTimes = async (
    userUri: string,
    startTime: string,
    endTime: string
  ): Promise<any> => {
    const queryParams = [
      `user=${userUri}`,
      `start_time=${startTime}`,
      `end_time=${endTime}`
    ].join('&');

    const url = `/user_busy_times?${queryParams}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  getUserAvailabilitySchedules = async (userUri: string): Promise<any> => {
    const url = `/user_availability_schedules?user=${userUri}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  getUser = async (userUri: string): Promise<any> => {
    const url = `/users/${userUri}`;
    const { data }: AxiosResponse = await this.request.get(
      url,
      this.requestConfiguration()
    );

    return data;
  };

  markAsNoShow = async (uri: string): Promise<any> => {
    const { data }: AxiosResponse = await this.request.post(
      '/invitee_no_shows',
      { invitee: uri },
      this.requestConfiguration()
    );
    return data;
  };

  undoNoShow = async (inviteeUuid: string): Promise<void> => {
    await this.request.delete(
      `/invitee_no_shows/${inviteeUuid}`,
      this.requestConfiguration()
    );
  };

  cancelEvent = async (uuid: string, reason: string): Promise<any> => {
    const { data }: AxiosResponse = await this.request.post(
      `/scheduled_events/${uuid}/cancellation`,
      { reason },
      this.requestConfiguration()
    );
    return data;
  };

  private requestNewAccessToken = (): Promise<
    AxiosResponse<AccessTokenResponse>
  > => {
    return axios.post(`${CALENDLY_AUTH_BASE_URL}/oauth/token`, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: this.refreshToken
    });
  };

  private _onCalendlyError = async (error: AxiosError): Promise<any> => {
    if (error.response?.status !== 401) return Promise.reject(error);

    this.request.interceptors.response.eject(this.requestInterceptor);

    try {
      const response = await this.requestNewAccessToken();
      const { access_token, refresh_token } = response.data;

      this.accessToken = access_token;
      this.refreshToken = refresh_token;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}

export default CalendlyService;
