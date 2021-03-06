const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  async handle (job, done) {
    const { user, content, ad } = job.data

    await Mail.sendMail({
      from: '"Ruan Berté" <berte.ruan@gmail.com>',
      to: ad.author.email,
      subject: `Solicitação de compra ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    return done()
  }
}

module.exports = new PurchaseMail()
