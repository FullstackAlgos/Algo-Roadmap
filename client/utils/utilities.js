if (process.env.NODE_ENV !== "production") require("../../secrets.js");

export const difficultMap = {
  1: "Easy",
  2: "Challenge Easy",
  3: "Medium",
  4: "Challenge Medium",
  5: "Hard",
};

export const SMTPEmail = {
  sendEmail(fromEmail, name, body) {
    const Email = {
      send: function (a) {
        return new Promise(function (n, e) {
          a.nocache = Math.floor(1e6 * Math.random() + 1);
          a.Action = "Send";
          var t = JSON.stringify(a);
          Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
            n(e);
          });
        });
      },
      ajaxPost: function (e, n, t) {
        var a = Email.createCORSRequest("POST", e);
        a.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        a.onload = function () {
          var e = a.responseText;
          null != t && t(e);
        };
        a.send(n);
      },
      ajax: function (e, n) {
        var t = Email.createCORSRequest("GET", e);
        t.onload = function () {
          var e = t.responseText;
          null != n && n(e);
        };
        t.send();
      },
      createCORSRequest: function (e, n) {
        var t = new XMLHttpRequest();
        return (
          "withCredentials" in t
            ? t.open(e, n, !0)
            : "undefined" != typeof XDomainRequest
            ? (t = new XMLHttpRequest().open(e, n))
            : (t = null),
          t
        );
      },
    };

    Email.send({
      SecureToken: process.env.email,
      To: "jjss886@gmail.com",
      From: fromEmail,
      Subject: `Algo Roadmap Feedback from ${name}`,
      Body: body,
    });
    // .then(() =>
    //   alert("Analysis sent! Please double check your spam folder.")
    // );
  },
};
