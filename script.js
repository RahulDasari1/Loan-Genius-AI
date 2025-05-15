document.getElementById('employee-tab').addEventListener('click', function () {
    document.getElementById('employee-form').classList.remove('hidden');
    document.getElementById('farmer-form').classList.add('hidden');
    document.getElementById('employee-tab').classList.add('tab-active');
    document.getElementById('employee-tab').classList.remove('bg-white', 'text-gray-700');
    document.getElementById('farmer-tab').classList.remove('tab-active');
    document.getElementById('farmer-tab').classList.add('bg-white', 'text-gray-700');
});

document.getElementById('farmer-tab').addEventListener('click', function () {
    document.getElementById('farmer-form').classList.remove('hidden');
    document.getElementById('employee-form').classList.add('hidden');
    document.getElementById('farmer-tab').classList.add('tab-active');
    document.getElementById('farmer-tab').classList.remove('bg-white', 'text-gray-700');
    document.getElementById('employee-tab').classList.remove('tab-active');
    document.getElementById('employee-tab').classList.add('bg-white', 'text-gray-700');
});

document.getElementById('credit-score').addEventListener('input', function () {
    document.getElementById('credit-score-value').textContent = this.value;
});

document.getElementById('farmer-credit-score').addEventListener('input', function () {
    document.getElementById('farmer-credit-score-value').textContent = this.value;
});

document.getElementById('employee-predict-btn').addEventListener('click', function () {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result-card').classList.add('hidden');

    setTimeout(function () {
        document.getElementById('loading').classList.add('hidden');

        const creditScore = parseInt(document.getElementById('credit-score').value);
        const monthlyIncome = parseInt(document.getElementById('monthly-income').value) || 50000;
        const employmentType = document.getElementById('employment-type').value;
        const loanPurpose = document.getElementById('loan-purpose').value;

        let loanAmount = calculateEmployeeLoanAmount(creditScore, monthlyIncome, employmentType, loanPurpose);
        let interestRate = calculateInterestRate(creditScore);
        let loanTerm = calculateLoanTerm(loanPurpose);

        document.getElementById('loan-amount').textContent = '₹' + loanAmount.toLocaleString();
        document.getElementById('interest-rate').textContent = interestRate;
        document.getElementById('loan-term').textContent = loanTerm;

        updateKeyFactors('employee');
        updateAIRecommendation(creditScore, loanAmount);

        document.getElementById('result-card').classList.remove('hidden');
        document.getElementById('result-card').classList.add('show');
        document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
});

document.getElementById('farmer-predict-btn').addEventListener('click', function () {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result-card').classList.add('hidden');

    setTimeout(function () {
        document.getElementById('loading').classList.add('hidden');

        const creditScore = parseInt(document.getElementById('farmer-credit-score').value);
        const landSize = parseInt(document.getElementById('land-size').value) || 5;
        const cropType = document.getElementById('crop-type').value;
        const annualYield = parseInt(document.getElementById('annual-yield').value) || 200000;
        const loanPurpose = document.getElementById('farmer-loan-purpose').value;

        let loanAmount = calculateFarmerLoanAmount(creditScore, landSize, cropType, annualYield, loanPurpose);
        let interestRate = calculateFarmerInterestRate(creditScore, cropType);
        let loanTerm = calculateFarmerLoanTerm(loanPurpose);

        document.getElementById('loan-amount').textContent = '₹' + loanAmount.toLocaleString();
        document.getElementById('interest-rate').textContent = interestRate;
        document.getElementById('loan-term').textContent = loanTerm;

        updateKeyFactors('farmer');
        updateFarmerAIRecommendation(creditScore, loanAmount, cropType);

        document.getElementById('result-card').classList.remove('hidden');
        document.getElementById('result-card').classList.add('show');
        document.getElementById('result-card').scrollIntoView({ behavior: 'smooth' });
    }, 2000);
});

document.getElementById('new-prediction-btn').addEventListener('click', function () {
    document.getElementById('result-card').classList.remove('show');
    document.getElementById('result-card').classList.add('hidden');
    document.getElementById('prediction-tool').scrollIntoView({ behavior: 'smooth' });
});

document.getElementById('apply-now-btn').addEventListener('click', function () {
    alert('Thank you for your interest! In a real application, this would redirect you to a loan application form.');
});

document.getElementById('contact-submit-btn').addEventListener('click', function () {
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contact-form').querySelectorAll('input, textarea').forEach(input => input.value = '');
});
document.getElementById('menu-toggle').addEventListener('click', function () {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

function calculateEmployeeLoanAmount(creditScore, monthlyIncome, employmentType, loanPurpose) {
    let multiplier = 0;
    if (creditScore >= 750) multiplier = 36;
    else if (creditScore >= 700) multiplier = 30;
    else if (creditScore >= 650) multiplier = 24;
    else if (creditScore >= 600) multiplier = 18;
    else multiplier = 12;

    let employmentFactor = 1;
    if (employmentType === 'government') employmentFactor = 1.2;
    else if (employmentType === 'private') employmentFactor = 1.0;
    else if (employmentType === 'self-employed') employmentFactor = 0.9;
    else employmentFactor = 0.8;

    let purposeFactor = 1;
    if (loanPurpose === 'home') purposeFactor = 1.5;
    else if (loanPurpose === 'vehicle') purposeFactor = 1.2;
    else if (loanPurpose === 'education') purposeFactor = 1.3;
    else purposeFactor = 1.0;

    let loanAmount = monthlyIncome * multiplier * employmentFactor * purposeFactor;
    return Math.round(loanAmount / 10000) * 10000;
}

function calculateFarmerLoanAmount(creditScore, landSize, cropType, annualYield, loanPurpose) {
    let baseAmount = 0;
    if (creditScore >= 750) baseAmount = 500000;
    else if (creditScore >= 600) baseAmount = 400000;
    else if (creditScore >= 450) baseAmount = 300000;
    else if (creditScore >= 300) baseAmount = 200000;
    else if (creditScore >= 150) baseAmount = 150000;
    else baseAmount = 100000;

    let landFactor = Math.min(landSize * 0.5, 3);
    let cropFactor = 1;
    if (cropType === 'rice' || cropType === 'wheat') cropFactor = 1.2;
    else if (cropType === 'sugarcane') cropFactor = 1.3;
    else if (cropType === 'vegetables' || cropType === 'fruits') cropFactor = 1.4;
    else cropFactor = 1.0;

    let yieldFactor = Math.min(annualYield / 100000, 3);
    let purposeFactor = 1;
    if (loanPurpose === 'equipment') purposeFactor = 1.2;
    else if (loanPurpose === 'irrigation') purposeFactor = 1.3;
    else if (loanPurpose === 'land') purposeFactor = 1.5;
    else purposeFactor = 1.0;

    let loanAmount = baseAmount * landFactor * cropFactor * purposeFactor * (yieldFactor * 0.5 + 0.5);
    return Math.round(loanAmount / 10000) * 10000;
}

function calculateInterestRate(creditScore) {
    if (creditScore >= 750) return '7.5% - 8.5%';
    else if (creditScore >= 700) return '8.5% - 9.5%';
    else if (creditScore >= 650) return '9.5% - 10.5%';
    else if (creditScore >= 600) return '10.5% - 12.0%';
    else return '12.0% - 14.0%';
}

function calculateFarmerInterestRate(creditScore, cropType) {
    let baseRate = '';
    if (creditScore >= 750) baseRate = '6.5% - 7.5%';
    else if (creditScore >= 600) baseRate = '7.5% - 8.5%';
    else if (creditScore >= 450) baseRate = '8.5% - 9.5%';
    else if (creditScore >= 300) baseRate = '9.5% - 11.0%';
    else if (creditScore >= 150) baseRate = '11.0% - 12.5%';
    else baseRate = '12.5% - 14.0%';

    if (cropType === 'rice' || cropType === 'wheat') {
        return baseRate + ' (Eligible for subsidy)';
    }
    return baseRate;
}

function calculateLoanTerm(loanPurpose) {
    if (loanPurpose === 'home') return '10 - 20 years';
    else if (loanPurpose === 'vehicle') return '3 - 7 years';
    else if (loanPurpose === 'education') return '5 - 10 years';
    else if (loanPurpose === 'business') return '3 - 10 years';
    else return '1 - 5 years';
}

function calculateFarmerLoanTerm(loanPurpose) {
    if (loanPurpose === 'land') return '7 - 15 years';
    else if (loanPurpose === 'equipment') return '3 - 7 years';
    else if (loanPurpose === 'irrigation') return '5 - 10 years';
    else return '1 - 5 years';
}

function updateKeyFactors(userType) {
    const keyFactorsElement = document.getElementById('key-factors');
    keyFactorsElement.innerHTML = '';

    if (userType === 'employee') {
        const factors = [
            'Credit Score',
            'Monthly Income',
            'Employment Type',
            'Employment Duration',
            'Loan Purpose'
        ];

        factors.forEach(factor => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">${factor}</span>
            `;
            keyFactorsElement.appendChild(li);
        });
    } else {
        const factors = [
            'Credit Score',
            'Land Size',
            'Crop Type',
            'Annual Yield',
            'Previous Loan Repayment'
        ];

        factors.forEach(factor => {
            const li = document.createElement('li');
            li.className = 'flex items-start';
            li.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700">${factor}</span>
            `;
            keyFactorsElement.appendChild(li);
        });
    }
}

function updateAIRecommendation(creditScore, loanAmount) {
    const recommendationElement = document.getElementById('ai-recommendation');

    if (creditScore >= 700) {
        recommendationElement.textContent = `Based on your excellent credit profile, you qualify for a loan of ₹${loanAmount.toLocaleString()}. We recommend exploring fixed-rate options with our partner banks for the best rates.`;
    } else if (creditScore >= 650) {
        recommendationElement.textContent = `With your good credit profile, you qualify for a loan of ₹${loanAmount.toLocaleString()}. Consider improving your credit score further to access better interest rates in the future.`;
    } else {
        recommendationElement.textContent = `Based on your credit profile, you qualify for a loan of ₹${loanAmount.toLocaleString()}. We recommend exploring secured loan options or considering a co-applicant to potentially increase your loan amount.`;
    }
}

function updateFarmerAIRecommendation(creditScore, loanAmount, cropType) {
    const recommendationElement = document.getElementById('ai-recommendation');

    if (creditScore >= 600) {
        if (cropType === 'rice' || cropType === 'wheat') {
            recommendationElement.textContent = `Based on your excellent credit profile and crop selection, you qualify for a loan of ₹${loanAmount.toLocaleString()}. You may be eligible for government subsidies under the National Agricultural Loan Scheme.`;
        } else {
            recommendationElement.textContent = `Based on your excellent credit profile, you qualify for a loan of ₹${loanAmount.toLocaleString()}. We recommend exploring Kisan Credit Card options for additional benefits.`;
        }
    } else if (creditScore >= 300) {
        recommendationElement.textContent = `With your good credit profile, you qualify for a loan of ₹${loanAmount.toLocaleString()}. Consider exploring agricultural insurance options to protect your investment.`;
    } else {
        recommendationElement.textContent = `Based on your credit profile, you qualify for a loan of ₹${loanAmount.toLocaleString()}. We recommend exploring group lending programs or cooperative farming loans which may offer better terms.`;
    }
}