// app/privacy/page.tsx
export default function PrivacyPolicy() {
    return (
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto p-6 sm:p-8 ">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Puffy Roll Privacy Policy</h1>
            <p className="text-gray-600">Effective Date: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
  
          <div className="prose prose-sm sm:prose max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Information Collection</h2>
              <h3 className="font-medium mb-2">Personal Data</h3>
              <p className="mb-4">
                When you place an order through Puffy Roll, we collect:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Contact Information:</strong> Full name, email address, phone number</li>
                <li><strong>Shipping Details:</strong> Delivery address, country, zip code</li>
                <li><strong>Order Information:</strong> Products purchased, sizes, quantities, order value</li>
                <li><strong>Device Data:</strong> IP address, browser type, operating system</li>
              </ul>
              
              <h3 className="font-medium mb-2">Payment Processing</h3>
              <p>
                All payments are processed through <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe</a>. 
                We <strong>do not</strong> store credit card numbers or full payment details on our servers. 
                Stripe's privacy policy is available at <a href="https://stripe.com/privacy" className="text-blue-600 hover:underline">stripe.com/privacy</a>.
              </p>
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Use of Information</h2>
              <p className="mb-4">We use collected information to:</p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Process and fulfill your international orders</li>
                <li>Communicate about order status, shipping updates, and customer service inquiries</li>
                <li>Screen for potential risk and fraud</li>
                <li>Improve and optimize our website and services</li>
                <li>Comply with legal obligations (tax, customs, etc.)</li>
              </ul>
              <p>
                <strong>Marketing:</strong> We do not use customer data for third-party marketing. 
                Transactional emails (order confirmations, shipping updates) are sent directly through our platform.
              </p>
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Data Sharing & Disclosure</h2>
              <h3 className="font-medium mb-2">Service Providers</h3>
              <p className="mb-4">
                We share necessary information with:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Shipping carriers</strong> (UPS, FedEx, DHL, etc.) for order delivery</li>
                <li><strong>Payment processors</strong> (Stripe) for transaction completion</li>
                <li><strong>Customs authorities</strong> for international shipments as legally required</li>
              </ul>
              
              <h3 className="font-medium mb-2">Legal Compliance</h3>
              <p>
                We may disclose information when required by law, such as in response to subpoenas 
                or to comply with international trade regulations.
              </p>
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. International Data Transfers</h2>
              <p className="mb-4">
                As an international e-commerce business, your data may be transferred to and processed in:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>The United States (where our servers are located)</li>
                <li>Countries where our shipping carriers operate</li>
                <li>Your local customs jurisdiction</li>
              </ul>
              <p>
                We implement standard contractual clauses and security measures to protect your data 
                during these transfers.
              </p>
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Data Retention</h2>
              <p className="mb-4">
                We retain order information for:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Active use:</strong> 3 years from last purchase (for customer service purposes)</li>
                <li><strong>Legal compliance:</strong> 7 years for tax and financial records</li>
              </ul>
              <p>
                Shipping addresses are anonymized after 3 years of inactivity.
              </p>
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Your Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data (subject to legal limitations)</li>
                <li>Object to processing of your data</li>
                <li>Receive your data in a portable format</li>
              </ul>
     
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Security Measures</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures including:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>SSL/TLS encryption for all data transmissions</li>
                <li>Regular security audits of our systems</li>
                <li>Limited access controls to customer data</li>
                <li>Secure payment processing through PCI-DSS compliant providers</li>
              </ul>
            </section>
  
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Policy Updates</h2>
              <p className="mb-4">
                We may update this policy periodically. Material changes will be:
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Posted on this page with an updated effective date</li>
                <li>Communicated via email for significant changes affecting active customers</li>
              </ul>
            </section>
  

          </div>
        </div>
      </main>
    );
  }