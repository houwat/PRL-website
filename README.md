# PRL Website
Custom code for Mura <br />
<strong>*UNDER CONSTRUCTION *</strong> <br />
<h2>CSS Folder</h2>
<p>The CSS folder contains all custom stylesheets for the PRL website. Instructions for modifying the code:</p>
<ul>
  <li><strong>Modifications outside of Mura take place in the 'prlCustomCSS-2018.scss' file</strong>. This file contains variables that allow for control and consistency of visual components. This requires knowledge of SCSS programming language.</li>
  <li> <strong>Use an automated compile and minimize system</strong>. Mura only reads .css files. Instructions:
    <ol>
      <li>'prlCustomCSS-2018.scss file' is automatically compiled into the 'prlCustomCSS-2018.css' file on each new change.</li>
      <li>Then, the 'prlCustomCSS-2018.css' file is automatically minimized into the 'prlCustomCSS-2018.min.css' file</li>
      <li> Finally, copy and paste the contents from the 'prlCustomCSS-2018.min.css' file into Mura's dedicated custom CSS file. The dedicated file is found in Mura's back end. Go to the File Manager, then look for prl_User_Assets/File/websiteTheme/prlCustomCSS.css. Right click and choose 'Edit' under the 'prlCustomCSS.css' file and paste the code. Save your changes.</li>
    </ol>
  <li><strong>Inside Mura, do not change the name of the 'prlCustomCSS.css' file.</strong> Otherwise, the server will not load the custom CSS</li>
  <li>All the files in the folder are also found in the PRL server. Ensure that all versions at all locations are up to date.
</ul>
    
    Include locations of files (Ex: prl card markup under the website Branding guidelines section; homepage html is for brands section)
