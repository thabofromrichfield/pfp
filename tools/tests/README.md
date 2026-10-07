# Developer tests (not part of the website)

These check the "Request a Callback" form and the Package 3 wording. Nothing in this folder is uploaded to the hosting
(the website package is built from an explicit file list, see the repo history).

Set up once per fresh sandbox:

    cd tools/tests
    npm install
    export AWS_EXECUTION_ENV=AWS_Lambda_nodejs22.x LD_LIBRARY_PATH=/tmp/al2023/lib
    node inflate-libs.mjs          # unpacks the libraries the headless browser needs

Run:

    node php-mailer.test.mjs       # send-enquiry.php on PHP 7.4 to 8.5 with a stand-in mail() and a pretend mail server
    node form-e2e.test.mjs         # real Chromium + the real page + the real send-enquiry.php, 21 situations
    node layout.test.mjs           # "Total Package Value" wording at 8 widths (screenshots go to /tmp)

`php-mailer.test.mjs 8.3` runs a single PHP version. `SCRIPT_PATH=/path/to/changed.php node php-mailer.test.mjs 8.3`
runs the same checks against a modified copy of the mailer (used to prove the tests really fail when the code is broken).

What can NOT be tested here: delivery through the real hosting mail system. After any change to the mailer, send one
real test enquiry from the live site and confirm the email arrives in the enquiries mailbox.
