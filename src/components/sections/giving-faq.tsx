'use client'

import { useState } from 'react'

export function GivingFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqCategories = [
    {
      title: "General Questions",
      faqs: [
        {
          id: 1,
          question: "How much should I give?",
          answer: "We believe in cheerful, proportional giving as outlined in 2 Corinthians 9:7. Many follow the biblical principle of tithing (10% of income), but we encourage everyone to pray and give as God leads them. Start where you can and grow in generosity over time."
        },
        {
          id: 2,
          question: "Is my giving tax-deductible?",
          answer: "Yes! Our church is a 501(c)(3) nonprofit organization, so all donations are tax-deductible to the fullest extent allowed by law. You'll receive receipts for your records and an annual giving statement for tax purposes."
        },
        {
          id: 3,
          question: "How is my donation used?",
          answer: "Your gifts support our church operations, ministries, missions, community outreach, and facility maintenance. We provide detailed annual reports showing exactly how funds are allocated. A small percentage covers administrative costs, with the majority going directly to ministry."
        },
        {
          id: 4,
          question: "Can I designate where my gift goes?",
          answer: "Absolutely! You can designate your gifts to specific funds like missions, building fund, youth ministry, or community outreach. If no designation is made, your gift supports the general fund for overall church operations and ministries."
        }
      ]
    },
    {
      title: "Online & Digital Giving",
      faqs: [
        {
          id: 5,
          question: "Is online giving secure?",
          answer: "Yes, we use industry-standard encryption and security measures. Our giving platform is PCI-compliant and uses the same security protocols as major banks. Your financial information is never stored on our servers."
        },
        {
          id: 6,
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), debit cards, and bank transfers (ACH). Bank transfers have lower processing fees, so more of your gift goes directly to ministry."
        },
        {
          id: 7,
          question: "Can I set up recurring gifts?",
          answer: "Yes! You can set up automatic recurring gifts on a weekly, bi-weekly, monthly, or yearly basis. You can modify or cancel recurring gifts at any time through your online giving account."
        },
        {
          id: 8,
          question: "How does text giving work?",
          answer: "Simply text your gift amount to (555) 123-GIVE. First-time users will receive a link to complete a brief setup. After that, future gifts are processed instantly with just a text message."
        }
      ]
    },
    {
      title: "Special Circumstances",
      faqs: [
        {
          id: 9,
          question: "Can I give stocks or other assets?",
          answer: "Yes! We gladly accept stocks, bonds, mutual funds, and other appreciated assets. This can provide significant tax advantages by avoiding capital gains taxes while receiving a full tax deduction. Contact our finance office for assistance."
        },
        {
          id: 10,
          question: "What about cryptocurrency donations?",
          answer: "We accept Bitcoin, Ethereum, and other major cryptocurrencies through our secure crypto giving platform. This allows you to avoid capital gains taxes on appreciation while supporting ministry."
        },
        {
          id: 11,
          question: "How can I include the church in my will?",
          answer: "Planned giving through wills, trusts, or beneficiary designations is a wonderful way to leave a lasting legacy. Our planned giving advisor can help you explore options that benefit both your family and the church."
        },
        {
          id: 12,
          question: "Does my employer offer matching gifts?",
          answer: "Many employers will match charitable donations, effectively doubling your impact! Contact your HR department or check your company's intranet for matching gift programs. We're happy to provide any documentation needed."
        }
      ]
    },
    {
      title: "Practical Concerns",
      faqs: [
        {
          id: 13,
          question: "What if I make a mistake with my gift?",
          answer: "Contact our finance office immediately if you notice an error. We can typically process refunds or corrections within 24-48 hours. For recurring gifts, we can adjust or cancel future donations right away."
        },
        {
          id: 14,
          question: "Can I give anonymously?",
          answer: "Yes, you can give anonymously through cash offerings or by requesting anonymity when giving online. However, for tax purposes, you'll need to provide your information to receive a receipt."
        },
        {
          id: 15,
          question: "When will I receive my giving receipt?",
          answer: "Online gifts receive immediate email receipts. Cash and check gifts are receipted quarterly unless you request a specific receipt. Annual giving statements for tax purposes are mailed in January."
        },
        {
          id: 16,
          question: "What if I'm going through financial hardship?",
          answer: "Please don't feel pressured to give beyond your means. God wants us to give cheerfully, not out of obligation or financial stress. Our pastoral team is here to support you during difficult times, and we have benevolence funds to help members in need."
        }
      ]
    }
  ]

  const testimonials = [
    {
      quote: "Setting up recurring giving has been such a blessing. It's one less thing to think about, and I know I'm consistently supporting the ministries I care about.",
      author: "Jennifer W.",
      role: "Long-time Member"
    },
    {
      quote: "The text giving option is perfect for spontaneous giving during special offerings. It's so quick and easy to participate right from the service.",
      author: "Mark T.",
      role: "Regular Attendee"
    },
    {
      quote: "I love being able to track my giving history online. It makes tax season so much easier, and I can see the impact of my generosity throughout the year.",
      author: "Carol S.",
      role: "Ministry Volunteer"
    }
  ]

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Questions & Answers
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Giving FAQ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about giving, or contact our team if you need additional help
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Categories */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">
                    {category.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {category.faqs.map((faq) => (
                      <div key={faq.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                        >
                          <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                          <svg 
                            className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 ${
                              openFAQ === faq.id ? 'transform rotate-180' : ''
                            }`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openFAQ === faq.id && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-gray-100 pt-4">
                              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-blue-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-blue-900 mb-4">Still Have Questions?</h4>
              <p className="text-blue-800 text-sm mb-6">
                Our finance team is here to help with any giving questions you might have.
              </p>
              
              <div className="space-y-3">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm text-blue-800 hover:text-blue-900 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (555) 123-4567
                </a>
                
                <a
                  href="mailto:giving@churchname.org"
                  className="flex items-center gap-3 text-sm text-blue-800 hover:text-blue-900 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  giving@churchname.org
                </a>
              </div>
              
              <button className="w-full mt-4 bg-blue-600 text-white px-4 py-3 font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm">
                Schedule Meeting
              </button>
            </div>

            {/* Quick Links */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h4>
              <div className="space-y-3">
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  → Online Giving Portal
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  → Download Church App
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  → Annual Giving Report
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  → Planned Giving Guide
                </a>
                <a href="#" className="block text-sm text-gray-600 hover:text-blue-600 transition-colors duration-300">
                  → Financial Transparency
                </a>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">What People Say</h4>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-gray-600 italic mb-3">"{testimonial.quote}"</p>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{testimonial.author}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-green-900">Secure Giving</h4>
              </div>
              <p className="text-green-800 text-sm mb-3">
                Your financial information is protected with bank-level security.
              </p>
              <div className="text-xs text-green-700 space-y-1">
                <div>✓ 256-bit SSL encryption</div>
                <div>✓ PCI-compliant processing</div>
                <div>✓ No data stored locally</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-20 text-center">
          <div className="bg-gray-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Giving?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of others who are making a difference through generous giving. 
              Start your giving journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-4 font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Give Now
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300">
                Learn More About Giving
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 