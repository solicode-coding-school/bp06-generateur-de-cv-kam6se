function saveToLocalStorage() {
    const cvData = {
        personalInfo: {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            profile: document.getElementById('profile').value,
            photo: photoDataUrl
        },
        educations: getEducations(),
        experiences: getExperiences(),
        skills: getSkills(),
        languages: getLanguages()
    };

    localStorage.setItem('cvData', JSON.stringify(cvData));
}


function getEducations() {
    var educations = [];
    var eduElements = document.getElementsByClassName('dynamic-inputs');
    
    for(var i = 0; i < eduElements.length; i++) {
        var edu = eduElements[i];
        if(edu.querySelector('.education-diploma')) {
            educations.push({
                diploma: edu.querySelector('.education-diploma').value,
                school: edu.querySelector('.education-school').value,
                year: edu.querySelector('.education-year').value,
                description: edu.querySelector('.education-description').value
            });
        }
    }
    return educations;
}

function getExperiences() {
    var experiences = [];
    var expElements = document.getElementsByClassName('dynamic-inputs');
    
    for(var i = 0; i < expElements.length; i++) {
        var exp = expElements[i];
        if(exp.querySelector('.experience-title')) {
            experiences.push({
                title: exp.querySelector('.experience-title').value,
                company: exp.querySelector('.experience-company').value,
                period: exp.querySelector('.experience-period').value,
                description: exp.querySelector('.experience-description').value
            });
        }
    }
    return experiences;
}

function getSkills() {
    var skills = [];
    var skillElements = document.getElementsByClassName('dynamic-inputs');
    
    for(var i = 0; i < skillElements.length; i++) {
        var skill = skillElements[i];
        if(skill.querySelector('.skill-input')) {
            skills.push({
                name: skill.querySelector('.skill-input').value,
                level: skill.querySelector('.skill-level').value
            });
        }
    }
    return skills;
}

function getLanguages() {
    var languages = [];
    var langElements = document.getElementsByClassName('dynamic-inputs');
    
    for(var i = 0; i < langElements.length; i++) {
        var lang = langElements[i];
        if(lang.querySelector('.language-name')) {
            languages.push({
                name: lang.querySelector('.language-name').value,
                level: lang.querySelector('.language-level').value
            });
        }
    }
    return languages;
}


function loadFromLocalStorage() {
    var savedData = localStorage.getItem('cvData');
    if (savedData) {
        var cvData = JSON.parse(savedData);
        
        
        document.getElementById('fullName').value = cvData.personalInfo.fullName;
        document.getElementById('email').value = cvData.personalInfo.email;
        document.getElementById('phone').value = cvData.personalInfo.phone;
        document.getElementById('address').value = cvData.personalInfo.address;
        document.getElementById('profile').value = cvData.personalInfo.profile;
        photoDataUrl = cvData.personalInfo.photo;

        for(var i = 0; i < cvData.educations.length; i++) {
            var edu = cvData.educations[i];
            addEducation();
            var lastEdu = document.querySelector('#education-container .dynamic-inputs:last-child');
            lastEdu.querySelector('.education-diploma').value = edu.diploma;
            lastEdu.querySelector('.education-school').value = edu.school;
            lastEdu.querySelector('.education-year').value = edu.year;
            lastEdu.querySelector('.education-description').value = edu.description;
        }

      
        for(var i = 0; i < cvData.experiences.length; i++) {
            var exp = cvData.experiences[i];
            addExperience();
            var lastExp = document.querySelector('#experience-container .dynamic-inputs:last-child');
            lastExp.querySelector('.experience-title').value = exp.title;
            lastExp.querySelector('.experience-company').value = exp.company;
            lastExp.querySelector('.experience-period').value = exp.period;
            lastExp.querySelector('.experience-description').value = exp.description;
        }

        
        for(var i = 0; i < cvData.skills.length; i++) {
            var skill = cvData.skills[i];
            addSkill();
            var lastSkill = document.querySelector('#skills-container .dynamic-inputs:last-child');
            lastSkill.querySelector('.skill-input').value = skill.name;
            lastSkill.querySelector('.skill-level').value = skill.level;
        }

       
        for(var i = 0; i < cvData.languages.length; i++) {
            var lang = cvData.languages[i];
            addLanguage();
            var lastLang = document.querySelector('#languages-container .dynamic-inputs:last-child');
            lastLang.querySelector('.language-name').value = lang.name;
            lastLang.querySelector('.language-level').value = lang.level;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});


function addSaveEvents() {
    var inputs = document.getElementsByTagName('input');
    var textareas = document.getElementsByTagName('textarea');
    var selects = document.getElementsByTagName('select');

    for(var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('change', saveToLocalStorage);
    }

    for(var i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener('change', saveToLocalStorage);
    }

    for(var i = 0; i < selects.length; i++) {
        selects[i].addEventListener('change', saveToLocalStorage);
    }
}


addSaveEvents();
function refreshLocalStorage() {
    // Effacer le stockage local existant
    localStorage.removeItem('cvData');
    
    // Effacer tous les champs de saisie
    document.getElementById('fullName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
    document.getElementById('profile').value = '';
    photoDataUrl = '';
    
    // Effacer les conteneurs dynamiques
    document.getElementById('education-container').innerHTML = '';
    document.getElementById('experience-container').innerHTML = '';
    document.getElementById('skills-container').innerHTML = '';
    document.getElementById('languages-container').innerHTML = '';
    
    //Effacer l'aperçu du CV
    document.getElementById('cv-preview').innerHTML = '';
    
    
}