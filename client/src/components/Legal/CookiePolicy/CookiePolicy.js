import React, { useState } from 'react';
import './CookiePolicy.scss';
import { Collapse, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

export default function CookiePolicy() {
  const [activeKeys, setActiveKeys] = useState([]);

  const cookiePolicyItems = [
    {
      key: '1',
      label: <h2 className='cookie-h2'><span className='cookie-h2-number'>[𝟭]</span> What Are Cookies?</h2>,
      children: (
        <p className='cookie-text'>
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>
      ),
    },
    {
      key: '2',
      label: <h2 className='cookie-h2'><span className='cookie-h2-number'>[𝟮]</span> Why Do We Use Cookies?</h2>,
      children: (
        <p className='cookie-text'>
          We use first and third-party cookies for several reasons. Some
          cookies are required for technical reasons in order for our Website to
          operate, and we refer to these as "essential" or "strictly necessary"
          cookies. Other cookies also enable us to track and target the
          interests of our users to enhance the experience on our Online
          Properties. Third parties serve cookies through our Website for
          advertising, analytics, and other purposes.
        </p>
      ),
    },
    {
      key: '3',
      label: (
        <h2 className='cookie-h2'><span className='cookie-h2-number'>[𝟯]</span> Types of Cookies We Use</h2>
      ),
      children: (
        <ul className='cookie-ul'>
          <h3 className='cookie-h3'>Analytics Cookies</h3>
          <p className='cookie-text key-4-text'>
            Analytics cookies are used to collect information about how visitors use our website. This data helps us understand and analyze website traffic, user interactions, and patterns. We use this information to improve the performance and functionality of our site, making it more user-friendly and engaging. The data collected through these cookies is aggregated and anonymous, and we do not disclose any personally identifiable information.
          </p>
          <br />
          <h3 className='cookie-h3'>Login Cookies</h3>
          <p className='cookie-text key-4-text'>
            Login cookies are essential for providing secure access to certain features and areas of our website. These cookies allow you to log in and stay authenticated during your session, ensuring a seamless user experience while navigating the site. They help us verify your identity and protect your personal information from unauthorized access.
            </p>
          <br />
          <h3 className='cookie-h3'>Preference Cookies</h3>
          <p className='cookie-text key-4-text'>
            Preference cookies enable our website to remember certain settings and choices you've made, such as your preferred language or font size. By remembering these preferences, we can tailor your browsing experience and provide content that is more relevant and personalized to you.
          </p>
          <br />
        </ul>
      ),
    },
    {
      key: '4',
      label: <h2 className='cookie-h2'><span className='cookie-h2-number'>[𝟰]</span> Third-Party Cookies</h2>,
      children: (
        <>
          <p className='cookie-text'>
            In addition to our own cookies, we also use cookies provided by third parties to enhance your website experience. These cookies are set by external services and technologies that we have integrated into our website. The following third-party cookies may be used on our site:
          </p>
          <ul className='cookie-ul'>
            <li className='cookie__list-item'>
              <b>Google Tag Manager:</b> This technology allows us to manage and deploy various marketing tags or scripts on our website. It helps us streamline the process of updating and maintaining these tags, ensuring efficient tracking and analysis of user behavior, conversions, and other marketing metrics.
            </li>
            <li className='cookie__list-item'>
              <b>Google Analytics:</b> We utilize Google Analytics, a popular web analysis service provided by Google. This technology enables us to gather detailed statistics about our website's traffic, user interactions, and engagement. These insights help us make informed decisions to optimize our website, understand our audience better, and enhance the user experience.
            </li>
            <li className='cookie__list-item'>
              <b>Buy me a coffee:</b> This widget and fundraising technology allows visitors to make voluntary donations to support our platform and initiatives. The cookie set by Buy me a coffee helps to facilitate the donation process, ensuring a seamless and secure transaction experience for users who choose to contribute to our cause.
            </li>
            <br />
            <p className='cookie-text'>
              Please note that we have no control over the cookies set by these third-party services. We recommend reviewing their respective cookie policies to understand how your information is handled by them.
            </p>
          </ul>
        </>
      ),
    },
    {
      key: '5',
      label: <h2 className='cookie-h2'><span className='cookie-h2-number'>[𝟱]</span> How to Manage and Delete Cookies?</h2>,
      children: (
        <>
          <p className='cookie-text'>
            You have the right to decide whether to accept or reject cookies. You
            can exercise your cookie rights by setting your preferences in the
            Cookie Consent Manager. Essential cookies cannot be rejected as they
            are strictly necessary to provide you with services.
          </p>
          <p className='cookie-text'>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies or delete certain cookies. Generally, you should also be able to manage similar technologies in the same way that you manage cookies – using your browsers' preferences.
          </p>
          <p className='cookie-text'>
            Here is how you can do it in different browsers:
            <ul>
              <li className='cookie__list-item'>
                <b>Google Chrome:</b> Go to Settings ﹥ Privacy and security ﹥ Site Settings ﹥ Cookies and site data. Here, you can Clear cookies and site data as well as setting the browser to Block third-party cookies.
              </li>
              <li className='cookie__list-item'>
              <b>Mozilla Firefox:</b> Go to Options ﹥ Privacy & Security ﹥ Cookies and Site Data. You can Clear Data here, or you can set the browser to delete cookies every time you quit the browser.
              </li>
              <li className='cookie__list-item'>
              <b>Safari:</b> Go to Preferences ﹥ Privacy ﹥ Cookies and website data. You can then Block all cookies or remove specific cookies.
              </li>
              <li className='cookie__list-item'>
              <b>Internet Explorer:</b> Go to Settings ﹥ Internet options ﹥ General ﹥ Browsing history ﹥ Settings ﹥ Temporary Internet Files and Website Files. Here, you can Delete files or set the browser to delete browser history on exit.
              </li>
            </ul>
          </p>

        </>
      ),
    }
  ];

  const handleToggleAll = () => {
    if (activeKeys.length === cookiePolicyItems.length) {
      setActiveKeys([]);
    } else {
      setActiveKeys(cookiePolicyItems.map((item) => item.key));
    }
  };

  return (
    <>
      <div className='cookie--policy'>
        <h1 className='cookie-header'>Cookie Policy</h1>
        <p className='cookie-date'>Last updated: July 6, 2024</p>
        <br />
        <p className='cookie-text'>
          This Cookie Policy explains how Respitely uses cookies and similar
          technologies to recognize you when you visit our website at{' '}
          <a className='cookie-link' href='https://www.respitely.org'>
            https://www.respitely.org
          </a>{' '}
          ("Website"). It explains what these technologies are and why we use
          them, as well as your rights to control our use of them.
        </p>
        <p className='cookie-text'>
          The functionalities for which we use these technologies may include,
          but are not limited to, the following:
          <ul>
            <li className='cookie__list-item'>
              Understanding how you navigate through our website
            </li>
            <li className='cookie__list-item'>
              Personalizing your experience on our site
            </li>
            <li className='cookie__list-item'>
              Providing you with customized content
            </li>
            <li className='cookie__list-item'>
              Optimizing your user experience on our site
            </li>
          </ul>
          <br />
            In the context of this policy, 'we', 'our', and 'us' refers to
          respitely.org and 'you' refers to you, as the user of this website.
          By using respitely.org, you accept our use of cookies in accordance
          with this Cookie Policy. If you do not accept the use of cookies,
          please disable them as instructed in this Cookie Policy, so they are
          not downloaded to your device when you use our website. We reserve the
          right to modify this Cookie Policy at any time. Any changes will be
          effective immediately upon posting to the website, so please review it
          frequently.
        </p>
        <br />
        <Button onClick={handleToggleAll} className='toggle-all-button'>
          {activeKeys.length === cookiePolicyItems.length
            ? 'Collapse All'
            : 'Expand All'}
        </Button>
        <br />
        <br />

        <Collapse
          className='custom-collapse'
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          activeKey={activeKeys}
          onChange={(keys) => setActiveKeys(keys)}
          ghost
        >
          {cookiePolicyItems.map((item) => (
            <Collapse.Panel header={item.label} key={item.key}>
              {item.children}
            </Collapse.Panel>
          ))}
        </Collapse>
        <br />
        <p className='cookie-text'>
          If you have any questions about our use of cookies or other
          technologies, please email us at{' '}
          <a className='cookie-link' href='mailto:contact@respitely.org'>contact@respitely.org</a>{' '}
        </p>
      </div>
    </>
  );
}
