
import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Cookie Policy</h2>
      <p>Last Updated: June 1, 2024</p>
      
      <section>
        <h3 className="text-lg font-medium">1. What Are Cookies</h3>
        <p>
          Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored in your web browser and allows the website or a third-party to recognize you and make your next visit easier and the website more useful to you.
        </p>
      </section>
      
      <section>
        <h3 className="text-lg font-medium">2. How We Use Cookies</h3>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
          <li><strong>Performance Cookies:</strong> These allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
          <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced functionality and personalization.</li>
          <li><strong>Targeting Cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-lg font-medium">3. Types of Cookies We Use</h3>
        <p>
          <strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser (or once your session ends).
        </p>
        <p>
          <strong>Persistent Cookies:</strong> These cookies remain on your device for a set period of time or until you delete them.
        </p>
        <p>
          <strong>First-party Cookies:</strong> These cookies are set by the website you're visiting.
        </p>
        <p>
          <strong>Third-party Cookies:</strong> These cookies are set by someone other than the owner of the website you're visiting.
        </p>
      </section>
      
      <section>
        <h3 className="text-lg font-medium">4. Specific Cookies We Use</h3>
        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Purpose</th>
              <th className="border px-4 py-2 text-left">Duration</th>
              <th className="border px-4 py-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">sessionId</td>
              <td className="border px-4 py-2">Maintains your session state</td>
              <td className="border px-4 py-2">Session</td>
              <td className="border px-4 py-2">Essential</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">_ga</td>
              <td className="border px-4 py-2">Used by Google Analytics to distinguish users</td>
              <td className="border px-4 py-2">2 years</td>
              <td className="border px-4 py-2">Performance</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">theme</td>
              <td className="border px-4 py-2">Remembers your preferred theme (light/dark)</td>
              <td className="border px-4 py-2">1 year</td>
              <td className="border px-4 py-2">Functional</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section>
        <h3 className="text-lg font-medium">5. Your Choices Regarding Cookies</h3>
        <p>
          If you prefer to avoid the use of cookies on the website, first you must disable the use of cookies in your browser and then delete the cookies saved in your browser associated with this website. You may use this option for preventing the use of cookies at any time.
        </p>
        <p>
          If you do not accept our cookies, you may experience some inconvenience in your use of our website and some features may not function properly.
        </p>
        <p>
          If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
        </p>
      </section>
      
      <section>
        <h3 className="text-lg font-medium">6. Changes to Our Cookie Policy</h3>
        <p>
          We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
        </p>
      </section>
      
      <section>
        <h3 className="text-lg font-medium">7. Contact Us</h3>
        <p>
          If you have any questions about our Cookie Policy, please contact us at cookies@example.com.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
