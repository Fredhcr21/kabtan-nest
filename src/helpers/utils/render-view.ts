import ejs from 'ejs';
import customConfig from 'src/config/custom.interface';
import emailConfig from 'src/config/email.interface';
import url from 'url';
import { logger } from '../../core';

// eslint-disable-next-line
export default async function renderView(
  template: string,
  data: any,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _layout: string,
): Promise<string> {
  try {
    // Render the template view to generate the body of the view
    const emailHtml = await ejs.renderFile(
      __dirname + `/../../../views/${template}.ejs`,
      {
        ...data,
        url,
        // config: Config,
      },
    );

    // Render the layout view injecting the body previously generated
    const layoutHtml = await ejs.renderFile(
      __dirname + `/../../../views/layouts/layout-email.ejs`,
      {
        body: emailHtml,
        fromEmailAddress: emailConfig.fromEmailAddress,
        supportEmail: customConfig.supportEmail,
        url,
        // config: Config,
      },
    );
    return layoutHtml;
  } catch (err) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    logger.error(`Error when trying to render the HTML view: ${err.message}`);
    throw err;
  }
}
