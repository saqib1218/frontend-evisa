const faqs = [
  {
    question: "Do I need a visa or an ETA to travel to the UK?",
    answer:
      "It depends on your nationality. If you are from a visa-exempt country, you will need an ETA. If your country requires a visa, you must apply for a standard UK visa instead. Check the UK government's official list to confirm which document applies to you.",
  },
  {
    question: "When does the ETA become mandatory for my nationality?",
    answer:
      "The UK is rolling out the ETA requirement in phases. Some nationalities already need an ETA, while others will be added over time. We recommend checking the latest government updates or contacting us to confirm your requirements before booking travel.",
  },
  {
    question: "How long is my UK ETA valid for?",
    answer:
      "A UK ETA is typically valid for up to 2 years or until your passport expires, whichever comes first. You can use it for multiple trips during its validity period, with each stay usually lasting up to 6 months.",
  },
  {
    question: "I'm only transiting through the UK. Do I need an ETA?",
    answer:
      "Yes, in most cases travellers transiting through the UK by air will need an ETA, even if they do not leave the airport. Make sure to apply before your journey to avoid any boarding issues.",
  },
  {
    question: "Do babies and children need their own ETA?",
    answer:
      "Yes, every traveller including babies and children must have their own individual ETA linked to their own passport. Parents or guardians can apply on their behalf.",
  },
  {
    question: "Can I apply with a criminal record or previous visa refusal?",
    answer:
      "You can still apply, but a criminal record or previous visa refusal may affect your eligibility. We recommend providing full and accurate information in your application. Our specialists can review your case and guide you on the best approach.",
  },
  {
    question: "Why use your service instead of the government site?",
    answer:
      "Our service offers expert review of your application before submission, clear status tracking, around-the-clock support from real people, and the ability to save and resume your application anytime. We help reduce errors and improve your chances of a smooth approval.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export { faqs, faqSchema };
