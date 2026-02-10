import { motion } from 'framer-motion';
import './Privacy.css';

const Privacy = () => {
  return (
    <section id="privacy" className="privacy section">
      <div className="container">
        <motion.div
          className="privacy-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h1>Datenschutzerklärung</h1>
          <p className="last-updated">Stand: {new Date().toLocaleDateString('de-DE')}</p>

          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Muhamed Jaber<br />
            Bremen, Deutschland<br />
            E-Mail: hamudij8@gmail.com
          </p>

          <h2>2. Allgemeine Hinweise</h2>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
            passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
            persönlich identifiziert werden können.
          </p>

          <h2>3. Datenerfassung auf dieser Website</h2>
          
          <h3>Server-Log-Dateien</h3>
          <p>
            Diese Website wird über Firebase Hosting bereitgestellt. Der Provider der Seiten erhebt und speichert 
            automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. 
            Dies sind:
          </p>
          <ul>
            <li>Browsertyp und Browserversion</li>
            <li>Verwendetes Betriebssystem</li>
            <li>Referrer URL</li>
            <li>Hostname des zugreifenden Rechners</li>
            <li>Uhrzeit der Serveranfrage</li>
            <li>IP-Adresse</li>
          </ul>
          <p>
            Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser 
            Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes 
            Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
          </p>

          <h3>Kontaktformular</h3>
          <p>
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
            inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
            von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
          </p>
          <p>
            Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage 
            mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich 
            ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
            Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung 
            (Art. 6 Abs. 1 lit. a DSGVO).
          </p>
          <p>
            Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, 
            Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach 
            abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere 
            Aufbewahrungsfristen – bleiben unberührt.
          </p>

          <h3>E-Mail-Versand über EmailJS</h3>
          <p>
            Für den Versand von E-Mails über das Kontaktformular nutzen wir den Dienst EmailJS. Anbieter ist EmailJS.com 
            Ltd., Vereinigtes Königreich. Wenn Sie das Kontaktformular absenden, werden Ihre eingegebenen Daten an 
            EmailJS übermittelt und von dort an die im Formular angegebene E-Mail-Adresse weitergeleitet.
          </p>
          <p>
            Die Datenverarbeitung zum Zwecke der Kontaktaufnahme erfolgt auf Grundlage Ihrer Einwilligung 
            (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit 
            der bis zum Widerruf erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
          </p>

          <h2>4. Ihre Rechte</h2>
          <p>Sie haben folgende Rechte:</p>
          <ul>
            <li>Recht auf Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
            <li>Recht auf Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
            <li>Recht auf Löschung Ihrer Daten (Art. 17 DSGVO)</li>
            <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
            <li>Recht auf Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
          </ul>
          <p>
            Wenn Sie eines dieser Rechte ausüben möchten, wenden Sie sich bitte per E-Mail an: hamudij8@gmail.com
          </p>

          <h2>5. SSL- bzw. TLS-Verschlüsselung</h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine 
            SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile 
            des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
          </p>

          <h2>6. Widerruf Ihrer Einwilligung zur Datenverarbeitung</h2>
          <p>
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine 
            bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten 
            Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <h2>7. Speicherdauer</h2>
          <p>
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben 
            Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein 
            berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, 
            werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung 
            Ihrer personenbezogenen Daten haben.
          </p>

          <h2>8. Kontakt</h2>
          <p>
            Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden:<br />
            E-Mail: hamudij8@gmail.com
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Privacy;
