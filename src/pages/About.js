// src/components/About.js
import React from 'react';
import './About.css'; // Assuming you'll add some CSS for styling

const About = () => {
  return (
    <div className="about-container">
      <h2>About the Milk Collection System</h2>
      <p>
        The Milk Collection System is designed to streamline the process of collecting and managing milk from various farmers. Our system allows farmers to register their details, log their daily milk collections, and view their collection history.
      </p>
      <h3>Features</h3>
      <ul>
        <li>Farmer Registration: Easily register farmers with their details.</li>
        <li>Milk Collection Log: Record daily milk collections efficiently.</li>
        <li>Collection History: View and manage historical collection data.</li>
        <li>User-friendly Interface: Simple and intuitive design for ease of use.</li>
      </ul>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or need support, feel free to contact us at <a href="mailto:support@milkcollectionsystem.com">support@milkcollectionsystem.com</a>.
      </p>
    </div>
  );
};

export default About;
