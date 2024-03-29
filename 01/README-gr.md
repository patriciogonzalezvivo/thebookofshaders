# Ξεκινώντας
## Τι είναι ένας fragment shader;

Στο προηγούμενο κεφάλαιο περιγράψαμε τους shaders σαν το αντίστοιχο του πιεστηρίου του Γουτεμβέργιου για τα γραφικά. Γιατί; Και πιό σημαντικό: τι είναι ενας shader?

![Από έναν-ένα χαρακτήρα/γράμμα, Δεξιά: William Blades (1891). Στο μια-μια Σελίδα, Αριστερά: Rolt-Wheeler (1920).](print.png)

Αν έχετε ήδη εμπειρία στο να δημιουργείτε ζωγραφιές με υπολογιστές, ξέρετε πως μέρος της διαδικασίας είναι να ζωγραφίσετε έναν κύκλο, μετά ένα τετράγωνο, μια γραμμή, μερικά τρίγωνα μέχρι να συνθέσετε την εικόνα που θέλετε. Αυτή η διαδικασία είναι πολύ παρόμοια με το να γράφετε ένα γράμμα ή ένα βιβλίο με το χέρι - είναι ένα σύνολο από οδηγίες που πραγματοποιούν μια εργασία μετά την άλλη.

Οι shaders είναι επίσης ένα σύνολο απο οδηγίες, αλλά οι οδηγίες εκτελούνται όλες ταυτόχρονα για κάθε ένα pixel στην οθόνη. Αυτό σημαίνει πως ο κώδικας που γράφετε πρέπει να συμπεριφερθεί διαφορετικά ανάλογα με τη θέση του pixel στην οθόνη. Ανάλογα με ένα πιεστήριο τυπογραφείου, το πρόγραμμα θα συμπεριφερθεί σα μια συνάρτηση που παίρνει στην είσοδο μια θέση και επιστρέφει στην έξοδο ένα χρώμα, και που αφού μεταγλωττιστεί θα εκτελεστεί εκπληκτικά γρήγορα.

![Κινητοί Κινέζικοι χαρακτήρες](typepress.jpg)

## Γιατί είναι γρήγοροι οι shaders;

Για να το απαντήσουμε αυτό, σας παρουσιάζω το θαύμα της *παράλληλης επεξεργασίας*.

Φανταστείτε την CPU (επεξεργαστή) του υπολογιστή σας σαν έναν μεγάλο βιομηχανικό σωλήνα, και κάθε εργασία (task) σαν κάτι που περνάει μέσα απο αυτόν - σαν εργοστασιακή γραμμή παραγωγής. Κάποιες εργασίες είναι μεγαλύτερες από άλλες, που σημαίνει πως απαιτούν περισσότερο χρόνο και ενέργεια. Λέμε πως απαιτούν μεγαλύτερη υπολογιστική ισχύ. Λόγω της αρχιτεκτονικής των υπολογιστών οι εργασίες πρέπει να τρέχουν σε σειρά: κάθε εργασία πρέπει να τελειώνει μία τη φορά. Οι σύγχρονοι υπολογιστές συνήθως έχουν ομάδες τεσσάρων επεξεργαστών που λειτουργούν όπως αυτοί οι σωλήνες, ολοκληρώνοντας εργασίες τη μια μετά την άλλη ώστε τα πράγματα να συνεχίσουν να λειτουργούν ομαλά. Κάθε σωλήνας είναι επίσης γνωστός και σαν *thread (νήμα)*.

![CPU (επεξεργαστής)](00.jpeg)

Τα video games και άλλες εφαργμογές με γραφικά απαιτούν πολύ περισσότερη επεξεργαστική ισχύ από άλλα προγράμματα. Εξ' αιτίας του οπτικού τους περιεχομένου χρειάζεται να πραγματοποιούν πολύ μεγάλο αριθμό από λειτουργίες pixel προς pixel. Κάθε ένα pixel στην οθόνη χρειάζεται να υπολογιστεί, και σε 3D παιχνίδια, η γεωμετρία και η προοπτική πρέπει επίσης να υπολογιστούν.

Ας πάμε πίσω στην αναλογία με τους σωλήνες και τις εργασίες. Κάθε pixel στην οθόνη αντιπροσωπέυει μια μικρή εργασία. Από μόνη της, μια εργασία για ένα pixel δεν είναι τίποτα σπουδαίο για την CPU, αλλά (και εδώ είναι το πρόβλημα), η μικροσκοπική εργασία πρέπει να γίνει για κάθε pixel στην οθόνη! Αυτό σημαίνει πως σε μια παλιά οθόνη (με ανάλυση) 800x600, πρέπει σε κάθε frame (καρέ) να επεξεργαστούμε 480.000 pixels που σημαίνει 14.400.000 υπολογισμούς το δευτερόλεπτο! Ναι! Αυτό είναι ένα πρόβλημα αρκετά μεγάλο ώστε να καταβάλλει έναν επεξεργαστή. Σε μια σύγχρονη οθόνη retina 2880x1800 που ανανεώνεται στα 60 frames το δευτερόλεπτο, αυτός ο υπολογισμός καταλήγει σε 311.040.000 υπολογισμούς το δευτερόλεπτο. Πως λύνουν αυτό το πρόβλημα οι μηχανικοί των γραφικών?

![](03.jpeg)

Εδώ είναι που η παράλληλη επεξεργασία δίνει μια καλή λύση. Αντί να έχουμε λίγους μεγάλους και δυνατούς επεξεργαστές, η *σωλήνες*, είναι αποδοτικότερο να έχουμε πολλούς μικροσκοπικούς επεξεργαστές που λειτουργούν παράλληλα και ταυτόχρονα. Αυτό είναι μια Graphics Processing Unit (GPU) - (μονάδα επεξεργασίας γραφικών)

![GPU](04.jpeg)

Φανταστείτε τους μικρούς επεξεργαστές σαν ένα τραπέζει από σωλήνες, και τα δεδομένα για κάθε pixel σαν ένα μπαλάκι του πινγκ πονγκ. 14.400.000 μπάλες του πινγκ πονγκ το δευτερόλεπτο μπορούν να φράξουν λίγο - πολύ οποιοδήποτε σωλήνα. Αλλά ένα τραπέζι από 800x600 μικρούς σωλήνες από τους οποίους περνάνε 30 κύματα των 480.000 pixels το δευτερόλεπτο είναι κάτι που μπορούμε να διαχειριστούμε με άνεση. Αυτό δουλεύει με τον ίδιο τρόπο σε υψηλότερες αναλύσεις - όσο περισσότερο παράλληλο hardware (υλικό) διαθέτουμε, τόσο μεγαλύτερη η ροή που μπορεί να διαχειριστεί.

Άλλη μια "σούπερ δύναμη" των GPU είναι πως επιταχύνουν μέσω hardware ειδικές μαθηματικές συναρτήσεις, ώστε περίπλοκες μαθηματικές πράξεις επιλύονται κατευθείαν στο microchip, αντί για το software (λογισμικό). Αυτό σημαίνει εξαιρετικά γρήγορες πράξεις τριγωνομετρίας και άλγεβρας πινάκων - σε ταχύτητες που περιορίζονται μόνο από την ταχύτητα του ηλεκτρισμού.

## Τι είναι η GLSL;

GLSL σημαίνει OpenGL Shading Language (γλώσσα περιγραφής shaders της OpenGL), η οποία είναι το συγκεκριμένο πρότυπο για προγράμματα shaders που θα δείτε στα επόμενα κεφάλαια. Υπάρχουν και άλλοι τύποι shaders ανάλογα με το hardware και το Λειτουργικό Σύστημα. Εδώ θα δουλέψουμε με το πρότυπο OpenGL όπως το ορίζει το [Khronos Group](https://www.khronos.org/opengl/). Κάποια γνώση της ιστορίας της OpenGL μπορεί να φανέι χρήσιμη στο να καταλάβουμε αρκετές από τις περίεργες συμβάσεις της, και γι' αυτό προτείνω να ρίξετε μια ματιά στο: [openglbook.com/chapter-0-preface-what-is-opengl.html](http://openglbook.com/chapter-0-preface-what-is-opengl.html)

## Γιατί έχουν οι Shaders τη φήμη πως είναι δύσκολοι;

Όπως είπε και ο Θείος Ben "η μεγάλη δύναμη απαιτεί μεγάλη υπευθυνότητα", και η παράλληλη επεξεργασία ακολουθεί αυτό τον κανόνα. Ο ισχυρός αρχιτεκτονικός σχεδιασμός της GPU φέρνει τους δικούς του περιορισμούς και κανόνες.

Προκειμένου να λειτουργεί παράλληλα, κάθε σωλήνας - ή thread (νήμα) - πρέπει να είναι ανεξάρτητο από κάθε άλλο thread. Λέμε πως τα threads είναι *τυφλά* ως προς το τι κάνουν τα άλλα threads. Αυτός ο περιορισμός υπονοεί πως όλα τα δεδομένα κινούνται προς την ίδια κατεύθυνση. Κατά συνέπεια, είναι αδύνατο να δούμε το αποτέλεσμα ενός άλλου thread, να αλλάξουμε τα δεδομένα εισόδου, ή να οδηγήσουμε το αποτέλεσμα ενός thread σε ένα άλλο thread. Το να επιτρέψουμε επικοινωνία μεταξύ threads, βάζει σε κίνδυνο τη συνέπεια των δεδομένων.

Επίσης, η GPU κρατάει τον παράλληλο επεξεργαστή (τους σωλήνες) διαρκώς απασχολημένο. Μόλις αποδεσμευτούν, παίρνουν καινούριες πληροφορίες για επεξεργασία. Είναι αδύνατο για ένα thread να ξέρει τι έκανε μια στιγμή νωρίτερα. Θα μπορούσε να ζωγραφίζει ένα κουμπί για το UI (διεπαφή χρήστη) του λειτουργικού συστήματος, μετά να ζωγραφίζει ένα τμήμα του ουρανού για κάποιο παιχνίδι, μετά να δείχνει το κείμενο ενός email. Κάθε thread δεν είναι μόνο **τυφλό**, αλλά και **χωρίς μνήμη**. Εκτός από την αφαίρεση που απαιτείται για να γράψουμε (σε κώδικα) μια γενική συνάρτηση που αλλάζει το αποτέλεσμα ενός pixel τη φορά βάσει της θέσης του, οι περιορισμοί "τυφλότητας" και "έλλειψης μνήμης" (του thread) κάνουν τους λιγότερο έμπειρους προγραμματιστές να αποφεύγουν τους shaders.

Μην ανησυχείτε! Στα επόμενα κεφάλαια, θα μάθουμε βήμα - βήμα πως να πάμε από απλούς σε προχωρημένους υπολογισμούς με shaders. Αν διαβάζετε αυτό το κείμενο σε έναν σύγχρονο browser, θα μπορέσετε να παίξετε με τα διαδραστικά παραδείγματα. Ας μην καθυστερούμε άλλο τη διασκέδαση λοιπόν, πατήστε *Next >>* για να κάνουμε βουτιά κατ' ευθείαν στον κώδικα!