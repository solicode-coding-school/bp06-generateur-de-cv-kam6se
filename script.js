
let photoDataUrl = '';

function previewPhoto(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        photoDataUrl = e.target.result;
    }
    
    reader.readAsDataURL(file);
}

function addEducation() {
    const container = document.getElementById('education-container');
    const newEducation = document.createElement('div');
    newEducation.className = 'dynamic-inputs';
    newEducation.innerHTML = `
        <input type="text" placeholder="Diplôme" class="education-diploma">
        <input type="text" placeholder="École" class="education-school">
        <input type="text" placeholder="Année" class="education-year">
        <textarea placeholder="Description" class="education-description"></textarea>
        <button class="remove-button" onclick="removeEducation(this)">Supprimer</button>
    `;
    container.appendChild(newEducation);
}

function removeEducation(button) {
    button.parentElement.remove();
    
}

function addExperience() {
    const container = document.getElementById('experience-container');
    const newExperience = document.createElement('div');
    newExperience.className = 'dynamic-inputs';
    newExperience.innerHTML = `
        <input type="text" placeholder="Poste" class="experience-title">
        <input type="text" placeholder="Entreprise" class="experience-company">
        <input type="text" placeholder="Période" class="experience-period">
        <textarea placeholder="Description" class="experience-description"></textarea>
        <button class="remove-button" onclick="removeExperience(this)">Supprimer</button>
    `;
    container.appendChild(newExperience);
}

function removeExperience(button) {
    button.parentElement.remove();
    
}

function addSkill() {
    const container = document.getElementById('skills-container');
    const newSkill = document.createElement('div');
    newSkill.className = 'dynamic-inputs';
    newSkill.innerHTML = `
        <input type="text" placeholder="Compétence" class="skill-input">
        <select class="skill-level">
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
            <option value="Expert">Expert</option>
        </select>
        <button class="remove-button" onclick="removeSkill(this)">Supprimer</button>
    `;
    container.appendChild(newSkill);
}

function removeSkill(button) {
    button.parentElement.remove();
    
}

function addLanguage() {
    const container = document.getElementById('languages-container');
    const newLanguage = document.createElement('div');
    newLanguage.className = 'dynamic-inputs';
    newLanguage.innerHTML = `
        <input type="text" placeholder="Langue" class="language-name">
        <select class="language-level">
            <option value="Débutant">Débutant</option>
            <option value="Intermédiaire">Intermédiaire</option>
            <option value="Avancé">Avancé</option>
            <option value="Natif">Natif</option>
        </select>
        <button class="remove-button" onclick="removeLanguage(this)">Supprimer</button>
    `;
    container.appendChild(newLanguage);
}

function removeLanguage(button) {
    button.parentElement.remove();
    
}

function generateCV() {
    // Collecte les informations personnelles
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const profile = document.getElementById('profile').value;

    const educations = Array.from(document.getElementsByClassName('dynamic-inputs')).map(edu => {
        if (edu.querySelector('.education-diploma')) {
            return {
                diploma: edu.querySelector('.education-diploma').value,
                school: edu.querySelector('.education-school').value,
                year: edu.querySelector('.education-year').value,
                description: edu.querySelector('.education-description').value
            };
        }
        return null;
    }).filter(edu => edu !== null);

    
    const experiences = Array.from(document.getElementsByClassName('dynamic-inputs')).map(exp => {
        if (exp.querySelector('.experience-title')) {
            return {
                title: exp.querySelector('.experience-title').value,
                company: exp.querySelector('.experience-company').value,
                period: exp.querySelector('.experience-period').value,
                description: exp.querySelector('.experience-description').value
            };
        }
        return null;
    }).filter(exp => exp !== null);

    
    const skills = Array.from(document.getElementsByClassName('dynamic-inputs')).map(skill => {
        if (skill.querySelector('.skill-input')) {
            return {
                name: skill.querySelector('.skill-input').value,
                level: skill.querySelector('.skill-level').value
            };
        }
        return null;
    }).filter(skill => skill !== null);

    const languages = Array.from(document.getElementsByClassName('dynamic-inputs')).map(lang => {
        if (lang.querySelector('.language-name')) {
            return {
                name: lang.querySelector('.language-name').value,
                level: lang.querySelector('.language-level').value
            };
        }
        return null;
    }).filter(lang => lang !== null);

    // Génération du template
    const cvTemplate = `
        <div class="modern-cv">
            <div class="cv-sidebar">
                ${photoDataUrl ? `<img src="${photoDataUrl}" class="photo-preview" alt="Photo CV">` : ''}
                <h2>${fullName}</h2>
                <div class="contact-info">
                    <p>📧 ${email}</p>
                    <p>📱 ${phone}</p>
                    <p>📍 ${address}</p>
                </div>
                <div class="cv-section">
                    <h2>Compétences</h2>
                    ${skills.map(skill => `
                        <div class="skill-item">${skill.name} - ${skill.level}</div>
                    `).join('')}
                </div>
                <div class="cv-section">
                    <h2>Langues</h2>
                    ${languages.map(lang => `
                        <div class="skill-item">${lang.name} - ${lang.level}</div>
                    `).join('')}
                </div>
            </div>
            <div class="cv-main">
                <div class="cv-section">
                    <h2>Profil</h2>
                    <p>${profile}</p>
                </div>
                <div class="cv-section">
                    <h2>Expérience Professionnelle</h2>
                    ${experiences.map(exp => `
                        <div class="experience-item">
                            <h3>${exp.title}</h3>
                            <p>${exp.company} | ${exp.period}</p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="cv-section">
                    <h2>Formation</h2>
                    ${educations.map(edu => `
                        <div class="education-item">
                            <h3>${edu.diploma}</h3>
                            <p>${edu.school} | ${edu.year}</p>
                            <p>${edu.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    document.getElementById('cv-preview').innerHTML = cvTemplate;
}

function downloadCV() {
    //  Récupérer le contenu du CV
    var contenuCV = document.getElementById('cv-preview').innerHTML;

    //  Creer le template HTML
    var documentHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Mon CV</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            padding: 20px;
            background: #f0f0f0;
            color: #333;
        }

        .modern-cv {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 30px;
            background: white;
            max-width: 1200px;
            margin: 0 auto;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }

        .cv-sidebar {
            background: #2c3e50;
            color: white;
            padding: 30px;
        }

        .cv-main {
            padding: 30px;
        }

        .photo-preview {
            width: 200px;
            height: 200px;
            border-radius: 50%;
            object-fit: cover;
            border: 4px solid #3498db;
            margin: 0 auto 20px;
            display: block;
        }

        .cv-section {
            margin-bottom: 25px;
        }

        .cv-section h2 {
            color: #2c3e50;
            margin-bottom: 15px;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
        }

        .cv-sidebar h2 {
            color: white;
            border-bottom: 2px solid #3498db;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }

        .contact-info {
            margin-top: 20px;
        }

        .contact-info p {
            margin-bottom: 10px;
        }

        .skill-item {
            background: #3498db;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            margin: 5px;
            display: inline-block;
        }

        .experience-item, .education-item {
            margin-bottom: 15px;
            padding-left: 20px;
            border-left: 3px solid #3498db;
        }

        .experience-item h3, .education-item h3 {
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .experience-item p, .education-item p {
            margin-bottom: 5px;
            color: #666;
        }

        @media print {
            body {
                padding: 0;
                background: white;
            }
            .modern-cv {
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    ${contenuCV}
</body>
</html>`;

    //  un fichier téléchargeable; un "Blob" (Binary Large Object)
    var fichier = new Blob([documentHTML], { 
        type: 'text/html' 
    });

    //  Créer un lien de téléchargement
    var lienTelechargement = document.createElement('a');
    
    //  Configurer le lien
    lienTelechargement.href = window.URL.createObjectURL(fichier);
    lienTelechargement.download = 'mon_cv.html';

    //  Déclencher le téléchargement
    lienTelechargement.click();
}


