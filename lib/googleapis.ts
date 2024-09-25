import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Replace with your OAuth 2.0 credentials
const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

// Type definition for event parameters
interface EventParams {
  summary: string;
  description?: string;
  startDateTime: string; // ISO date format
  endDateTime: string; // ISO date format
  timeZone?: string;
  attendees?: string[];
  requestId: string; // Unique ID for the Meet request
  sendUpdates?: 'all' | 'none' | 'externalOnly'; // Optional notification settings
}

export const createEventWithMeet = async (eventParams: EventParams) => {
  try {
    const {
      summary,
      description = '',
      startDateTime,
      endDateTime,
      timeZone = 'America/Los_Angeles',
      attendees = [],
      requestId,
      sendUpdates = 'all'
    } = eventParams;

    const event: calendar_v3.Schema$Event = {
      summary,
      description,
      start: {
        dateTime: startDateTime,
        timeZone
      },
      end: {
        dateTime: endDateTime,
        timeZone
      },
      conferenceData: {
        createRequest: {
          requestId,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      attendees: attendees.map((email) => ({ email }))
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1, // Required for creating Google Meet links
      sendUpdates // Controls notification behavior
    });

    console.log('Event created: %s', response.data.htmlLink);
    console.log(
      'Google Meet Link: %s',
      response.data.conferenceData?.entryPoints?.[0].uri
    );
  } catch (error) {
    console.error('Error creating event:', error);
  }
};
