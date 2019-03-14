'use strict';

function submitContactRequest(server, req, res, next) {
  const transomMailer = server.registry.get('transomSmtp');
  const contactRequestInbox = process.env.CONTACT_REQUEST_INBOX;
  const messageJson = JSON.stringify(req.params, null, 2);

  req.log.info(`Sending message to ${contactRequestInbox}`, req.params);
  transomMailer.sendFromNoReply(
    {
      subject: 'Contact Request',
      to: contactRequestInbox,
      html: `<pre>${messageJson}</pre>`
    },
    (err, response) => {
      // setTimeout(()=> {
      if (err) {
        req.log.info('Failed:', err);
        return next(err);
      }
      req.log.info('Sent!', response);
      res.send({ result: 'success' });
      next();
      // }, 5000);
    }
  );
}

module.exports = { submitContactRequest };
