import { useState } from 'react';
import './TermsOfUse.scss';
import { Collapse, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

export default function TermsOfUse() {
    const [activeKeys, setActiveKeys] = useState([]);

  const termsOfUse = [
    {
      key: '1',
      label: <h2 className='terms-section-header'>1. Acceptance of Terms</h2>,
      children: (
        <p className='terms-paragraph'>
          Respitely ("we", "us", or "our") provides the website
          https://www.respitely.org (the "Site" or the "Web-App"), and the
          Respitely mobile application (the "App"), collectively referred to
          as the "Services". These Terms of Use govern your access to and use of
          our Services. By accessing or using the Services, you agree to be
          bound by these Terms and all terms incorporated by reference. If you
          do not agree to all of these terms, do not use our Services.
        </p>
      ),
    },
    {
      key: '2',
      label: <h2 className='terms-section-header'>2. Services Description</h2>,
      children: (
        <p className='terms-paragraph'>
          Respitely is a platform designed to assist individuals who are
          either experiencing homelessness or at risk of becoming homeless in
          Toronto by providing information on nearby shelters, free meals, legal
          services, and other essential resources. Our Services display
          real-time data and updates to ensure accurate information.
          <br />
          The information provided by the Services is not intended for
          distribution to or use by any person or entity in any jurisdiction or
          country where such distribution or use would be contrary to law or
          regulation.
        </p>
      ),
    },
    {
      key: '3',
      label: <h2 className='terms-section-header'>3. Privacy Policy</h2>,
      children: (
        <p className='terms-paragraph'>
          Your access to and use of our Services is also subject to our Privacy
          Policy, which covers how we collect, use, share, and store your
          personal information.
        </p>
      ),
    },
    {
      key: '4',
      label: <h2 className='terms-section-header'>4. User Accounts</h2>,
      children: (
        <p className='terms-paragraph'>
          To access certain features of our Services, you may be required to
          create an account. You must provide accurate and complete information
          and keep your account information updated. You are responsible for all
          activities that occur under your account and must keep your password
          secure. We reserve the right to terminate accounts at our sole
          discretion.
        </p>
      ),
    },
    {
      key: '5',
      label: <h2 className='terms-section-header'>5. Prohibited Activities</h2>,
      children: (
        <>
          <p className='terms-paragraph'>
            You are not permitted to use our Services for any activities that:
          </p>
          <ul className='terms-list'>
            <li className='terms-list-item'>
              Are illegal under any applicable laws,
            </li>
            <li className='terms-list-item'>
              Infringe upon the intellectual property rights of others,
            </li>
            <li className='terms-list-item'>
              Involve the transmission of "junk mail," "spam," or unsolicited
              mass mailing,
            </li>
            <li className='terms-list-item'>
              Attempt to gain unauthorized access to our systems or networks,
            </li>
            <li className='terms-list-item'>
              Interfere with or attempt to disrupt the operations of our
              Services.
            </li>
            <li className='terms-list-item'>
              Systematically retrieve data or other content from the Services to
              create or compile, directly or indirectly, a collection,
              compilation, database, or directory without written permission
              from us.
            </li>
            <li className='terms-list-item'>
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords.
            </li>
            <li className='terms-list-item'>
              Circumvent, disable, or otherwise interfere with security-related
              features of the Services, including features that prevent or
              restrict the use or copying of any Content or enforce limitations
              on the use of the Services and/or the Content contained therein.
            </li>
            <li className='terms-list-item'>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              the Services.
            </li>
            <li className='terms-list-item'>
              Use any information obtained from the Services in order to harass,
              abuse, or harm another person.
            </li>
            <li className='terms-list-item'>
              Make improper use of our support services or submit false reports
              of abuse or misconduct.
            </li>
            <li className='terms-list-item'>
              Use the Services in a manner inconsistent with any applicable laws
              or regulations.
            </li>
            <li className='terms-list-item'>
              Engage in unauthorized framing of or linking to the Services.
            </li>
            <li className='terms-list-item'>
              Upload or transmit (or attempt to upload or to transmit) viruses,
              Trojan horses, or other material, including excessive use of
              capital letters and spamming (continuous posting of repetitive
              text), that interferes with any party’s uninterrupted use and
              enjoyment of the Services or modifies, impairs, disrupts, alters,
              or interferes with the use, features, functions, operation, or
              maintenance of the Services.
            </li>
            <li className='terms-list-item'>
              Engage in any automated use of the system, such as using scripts
              to send comments or messages, or using any data mining, robots, or
              similar data gathering and extraction tools.
            </li>
            <li className='terms-list-item'>
              Delete the copyright or other proprietary rights notice from any
              Content.
            </li>
            <li className='terms-list-item'>
              Attempt to impersonate another user or person or use the username
              of another user.
            </li>
            <li className='terms-list-item'>
              Upload or transmit (or attempt to upload or to transmit) any
              material that acts as a passive or active information collection
              or transmission mechanism, including without limitation, clear
              graphics interchange formats ("gifs"), 1×1 pixels, web bugs,
              cookies, or other similar devices (sometimes referred to as
              "spyware" or "passive collection mechanisms" or "pcms").
            </li>
            <li className='terms-list-item'>
              Interfere with, disrupt, or create an undue burden on the Services
              or the networks or services connected to the Services.
            </li>
            <li className='terms-list-item'>
              Harass, annoy, intimidate, or threaten any of our employees or
              agents engaged in providing any portion of the Services to you.
            </li>
            <li className='terms-list-item'>
              Attempt to bypass any measures of the Services designed to prevent
              or restrict access to the Services, or any portion of the
              Services.
            </li>
            <li className='terms-list-item'>
              Copy or adapt the Services' software, including but not limited to
              Flash, PHP, HTML, JavaScript, or other code.
            </li>
            <li className='terms-list-item'>
              Except as permitted by applicable law, decipher, decompile,
              disassemble, or reverse engineer any of the software comprising or
              in any way making up a part of the Services.
            </li>
            <li className='terms-list-item'>
              Except as may be the result of standard search engine or Internet
              browser usage, use, launch, develop, or distribute any automated
              system, including without limitation, any spider, robot, cheat
              utility, scraper, or offline reader that accesses the Services, or
              use or launch any unauthorized script or other software.
            </li>
            <li className='terms-list-item'>
              Use a buying agent or purchasing agent to make purchases on the
              Services.
            </li>
            <li className='terms-list-item'>
              Make any unauthorized use of the Services, including collecting
              usernames and/or email addresses of users by electronic or other
              means for the purpose of sending unsolicited email, or creating
              user accounts by automated means or under false pretenses.
            </li>
            <li className='terms-list-item'>
              Use the Services as part of any effort to compete with us or
              otherwise use the Services and/or the Content for any
              revenue-generating endeavor or commercial enterprise.
            </li>
            <li className='terms-list-item'>
              Use the Services to advertise or offer to sell goods and services.
            </li>
            <li className='terms-list-item'>
              Misuse of Information: Users may not use information obtained from
              Respitely for purposes other than seeking shelter or essential
              resources.
            </li>
            <li className='terms-list-item'>
              Impersonation: Users may not impersonate any person or entity or
              falsely state or otherwise misrepresent their affiliation with a
              person or entity.
            </li>
            <li className='terms-list-item'>
              Unauthorized Access: Users may not attempt to gain unauthorized
              access to any part of the platform, its servers, or any related
              systems or networks.
            </li>
            <li className='terms-list-item'>
              Interference: Users may not interfere with or disrupt the
              operation of the platform or the servers or networks used to make
              the platform available.
            </li>
            <li className='terms-list-item'>
              Data Scraping and Harvesting: Users may not scrape, harvest, or
              collect information from the platform, whether by automated means
              or otherwise, without permission.
            </li>
            <li className='terms-list-item'>
              Commercial Use: Users may not use the platform for any commercial
              purposes or for the benefit of any third party without explicit
              permission.
            </li>
            <li className='terms-list-item'>
              Unlawful Activities: Users may not use the platform for any
              illegal activities or in violation of any local, provincial,
              national, or international laws or regulations.
            </li>
            <li className='terms-list-item'>
              Exploiting Vulnerabilities: Users may not exploit any platform
              vulnerabilities or perform any actions that could compromise the
              security or integrity of the platform.
            </li>
            <li className='terms-list-item'>
              Privacy Violations: Collecting or storing personal information of
              other users without their consent.
            </li>
            <li className='terms-list-item'>
              Resource Misuse: Using the platform’s resources section for
              non-related or inappropriate purposes.
            </li>
            <li className='terms-list-item'>
              Unauthorized Modifications: Attempting to modify or tamper with
              the platform’s functionality or features.
            </li>
            <li className='terms-list-item'>
              Interfering with Service: Actions that interfere with or disrupt
              the platform’s operations, such as denial-of-service attacks.
            </li>
            <li className='terms-list-item'>
              Sell or otherwise transfer your profile.
            </li>
          </ul>
        </>
      ),
    },
    {
      key: '6',
      label: <h2 className='terms-section-header'>6. Intellectual Property</h2>,
      children: (
        <p className='terms-paragraph'>
          We own all intellectual property rights in our Services. You are
          granted a non-exclusive, non-transferable, revocable license to access
          the Services for your personal, non-commercial use.
          <br />
          All content on the Services, including text, graphics, logos, images,
          as well as the compilation thereof, and any software used on the Site,
          is our property or the property of our licensors and protected by
          copyright and other laws that protect intellectual property and
          proprietary rights.
        </p>
      ),
    },
    {
      key: '7',
      label: (
        <h2 className='terms-section-header'>
          7. Links to Third-Party Websites
        </h2>
      ),
      children: (
        <p className='terms-paragraph'>
          Our Services may contain links to third-party websites or services
          that are not owned or controlled by Respitely. We have no control
          over, and assume no responsibility for, the content, privacy policies,
          or practices of any third-party websites or services.
          <br />
          <br />
          The Services may contain (or you may be sent via the Site or App)
          links to other websites ("Third-Party Websites") as well as articles,
          photographs, text, graphics, pictures, designs, music, sound, video,
          information, applications, software, and other content or items
          belonging to or originating from third parties ("Third-Party
          Content"). Such Third-Party Websites and Third-Party Content are not
          investigated, monitored, or checked for accuracy, appropriateness, or
          completeness by us, and we are not responsible for any Third-Party
          Websites accessed through the Services or any Third-Party Content
          posted on, available through, or installed from the Services,
          including the content, accuracy, offensiveness, opinions, reliability,
          privacy practices, or other policies of or contained in the
          Third-Party Websites or the Third-Party Content. Inclusion of, linking
          to, or permitting the use or installation of any Third-Party Websites
          or any Third-Party Content does not imply approval or endorsement
          thereof by us. If you decide to leave the Services and access the
          Third-Party Websites or to use or install any Third-Party Content, you
          do so at your own risk, and you should be aware these Legal Terms no
          longer govern. You should review the applicable terms and policies,
          including privacy and data gathering practices, of any website to
          which you navigate from the Services or relating to any applications
          you use or install from the Services. Any purchases you make through
          Third-Party Websites will be through other websites and from other
          companies, and we take no responsibility whatsoever in relation to
          such purchases which are exclusively between you and the applicable
          third party. You agree and acknowledge that we do not endorse the
          products or services offered on Third-Party Websites and you shall
          hold us blameless from any harm caused by your purchase of such
          products or services. Additionally, you shall hold us blameless from
          any losses sustained by you or harm caused to you relating to or
          resulting in any way from any Third-Party Content or any contact with
          Third-Party Websites.
        </p>
      ),
    },
    {
      key: '8',
      label: <h2 className='terms-section-header'>8. Termination</h2>,
      children: (
        <p className='terms-paragraph'>
          We may terminate or suspend your access to our Services immediately,
          without prior notice or liability, for any reason, including without
          limitation if you breach the Terms.
          <br />
          <br />
          These Legal Terms shall remain in full force and effect while you use
          the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL
          TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT
          NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING
          BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO
          REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION,
          WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
          APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
          PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT
          OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR
          SOLE DISCRETION.
        </p>
      ),
    },
    {
      key: '9',
      label: <h2 className='terms-section-header'>9. Privacy Policy</h2>,
      children: (
        <p className='terms-paragraph'>
          We care about data privacy and security. By using the Services, you
          agree to be bound by our Privacy Policy posted on the Services, which
          is incorporated into these Legal Terms. Please be advised the Services
          are hosted in Canada. If you access the Services from any other region
          of the world with laws or other requirements governing personal data
          collection, use, or disclosure that differ from applicable laws in
          Canada, then through your continued use of the Services, you are
          transferring your data to Canada, and you expressly consent to have
          your data transferred to and processed in Canada.
        </p>
      ),
    },
    {
      key: '10',
      label: <h2 className='terms-section-header'>10. Corrections</h2>,
      children: (
        <p className='terms-paragraph'>
          There may be information on the Services that contains typographical
          errors, inaccuracies, or omissions, including descriptions, pricing,
          availability, and various other information. We reserve the right to
          correct any errors, inaccuracies, or omissions and to change or update
          the information on the Services at any time, without prior notice.
        </p>
      ),
    },
    {
      key: '11',
      label: (
        <h2 className='terms-section-header'>11. Disclaimer of Warranties</h2>
      ),
      children: (
        <p className='terms-paragraph'>
          Our Services are provided "AS IS" and "AS AVAILABLE." We disclaim all
          warranties of any kind, whether express or implied, including, but not
          limited to, implied warranties of merchantability, fitness for a
          particular purpose, and non-infringement. We do not warrant that the
          platform will be uninterrupted, secure, or error-free. Your use of the
          platform is at your own risk.
          <br />
          <br />
          THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU
          AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE
          FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS
          OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF,
          INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE
          ACCURACY OR COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF
          ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE WILL
          ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR
          INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY
          DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND
          USE OF THE SERVICES, (3) ANY UNAUTHORIZED ACCESS TO OR USE OF OUR
          SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR
          FINANCIAL INFORMATION STORED THEREIN, (4) ANY INTERRUPTION OR
          CESSATION OF TRANSMISSION TO OR FROM THE SERVICES, (5) ANY BUGS,
          VIRUSES, TROJAN HORSES, OR THE LIKE WHICH MAY BE TRANSMITTED TO OR
          THROUGH THE SERVICES BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR
          OMISSIONS IN ANY CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF
          ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
          TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE DO NOT
          WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT
          OR SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH THE
          SERVICES, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE
          APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL
          NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY
          TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR
          SERVICES. AS WITH THE PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY
          MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND
          EXERCISE CAUTION WHERE APPROPRIATE.
        </p>
      ),
    },
    {
      key: '12',
      label: (
        <h2 className='terms-section-header'>12. Limitation of Liability</h2>
      ),
      children: (
        <p className='terms-paragraph'>
          To the maximum extent permitted by applicable law, in no event shall
          Respitely or its affiliates, agents, directors, employees,
          suppliers, or licensors be liable for any indirect, punitive,
          incidental, special, consequential, or exemplary damages, including
          damages for loss of profits, goodwill, use, data, or other intangible
          losses.
        </p>
      ),
    },
    {
      key: '13',
      label: (
        <h2 className='terms-section-header'>
          13. No Guarantee of Shelter Availability
        </h2>
      ),
      children: (
        <p className='terms-paragraph'>
          Respitely strives to provide accurate and up-to-date information on
          shelter availability based on data from the City of Toronto and other
          sources. However, we cannot guarantee the accuracy, completeness, or
          real-time availability of shelter accommodations. Shelter capacities
          and availability are subject to change frequently. Users are advised
          to contact shelters directly to confirm current availability.
          Respitely is not liable for any discrepancies or issues that may
          arise from relying on the information provided through our platform.
        </p>
      ),
    },
    {
      key: '14',
      label: <h2 className='terms-section-header'>14. Governing Law</h2>,
      children: (
        <p className='terms-paragraph'>
          These Terms shall be governed by and construed in accordance with the
          laws of Ontario, Canada, without regard to its conflict of law
          provisions.
        </p>
      ),
    },
    {
      key: '15',
      label: <h2 className='terms-section-header'>15. Changes to Terms</h2>,
      children: (
        <p className='terms-paragraph'>
          We reserve the right, at our sole discretion, to modify or replace
          these Terms at any time. What constitutes a material change will be
          determined at our sole discretion.
        </p>
      ),
    },
    {
      key: '16',
      label: <h2 className='terms-section-header'>16. Contact Us</h2>,
      children: (
        <p className='terms-paragraph'>
          If you have any questions about these Terms, please contact us at{' '}
          <a href='mailto:contact@respitely.org' className='terms-link'>
            contact@respitely.org
          </a>
          .
        </p>
      ),
    },
  ];

  const handleToggleAll = () => {
    if (activeKeys.length === termsOfUse.length) {
      setActiveKeys([]);
    } else {
      setActiveKeys(termsOfUse.map(item => item.key));
    }
  };

  return (
    <>
    <div className="terms-of-use">
      <h1 className="terms-header">Terms of Use</h1>
      <p className="terms-last-updated">Last Updated: Jul 6, 2024</p>

      <Button onClick={handleToggleAll} className="toggle-all-button">
        {activeKeys.length === termsOfUse.length ? 'Collapse All' : 'Expand All'}
      </Button>

      <Collapse
        className='custom-collapse'
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        activeKey={activeKeys}
        onChange={keys => setActiveKeys(keys)}
        ghost
      >
        {termsOfUse.map(item => (
          <Collapse.Panel header={item.label} key={item.key}>
            {item.children}
          </Collapse.Panel>
        ))}
      </Collapse>
    </div>

    </>
  );
}
