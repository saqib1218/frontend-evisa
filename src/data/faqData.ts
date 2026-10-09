const faqs = [
  {
    question: "Do I need to arrange anything before travelling to the UK?",
    answer:
      "It depends on your nationality and the reason for your trip. Many short-stay visitors need to sort out entry paperwork before they fly, and some travellers need a different type of permission altogether. Contact us to see what applies to you, or start with us and we'll check it with you.",
  },
  {
    question: "When do the entry rules apply to my nationality?",
    answer:
      "The UK has been introducing its entry requirements in stages, and the rules differ by nationality. Check with us before you book travel, or start with us and we'll confirm what applies to you.",
  },
  {
    question: "Can I use it for more than one trip?",
    answer:
      "If your application is approved, it is usually valid for up to 2 years, or until the travel document it's linked to expires, whichever comes first. You can normally use it for more than one trip during that time, and each stay is usually limited to a short period.",
  },
  {
    question: "Do I need to arrange anything for a stopover in the UK?",
    answer:
      "It depends on your nationality and on how your journey is routed, including whether you pass through UK border control. Check the current transit rules before you travel, or start with us and we'll check what applies to your trip.",
  },
  {
    question: "Do children and babies need their own application?",
    answer:
      "Yes, each traveller, including babies and children, needs their own individual application linked to their own travel document. A parent or guardian can complete it on their behalf. If you'd like help, you can start with us and add each traveller as you go.",
  },
  {
    question: "Can I apply if I've had an application refused before?",
    answer:
      "You can still apply, but your history may affect the outcome. You must answer every question honestly and completely, because the UK Home Office makes the decision and we can't guarantee any result. Our team can help you complete the application accurately.",
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
