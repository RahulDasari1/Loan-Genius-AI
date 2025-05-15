# Loan-Genius-AI: AI-Powered Loan Approval & Dynamic Pricing Platform

**Loan-Genius-AI** is an intelligent, end-to-end decisioning platform that leverages machine learning to automate loan approval workflows and dynamically price financial products. Designed for banks, NBFCs, and fintech institutions, it enables smarter credit decisions by combining predictive analytics, risk-based pricing, and an intuitive user interface.

![image](https://github.com/user-attachments/assets/24f3147c-0dc3-4a2b-b97b-3e9d4873eca1)

![image](https://github.com/user-attachments/assets/2e6318b7-6a36-4b55-b764-8092bf683a5a)

![image](https://github.com/user-attachments/assets/1032299e-ee80-4b0d-8ef3-51e3b3c059a0)


---

## Overview

Modern lending requires more than rule-based decisioning. Borrowers expect fast, fair, and personalized financial products. Lenders need precision risk assessment and agile pricing mechanisms. **Loan-Genius-AI** addresses this by:

* Predicting loan eligibility in real-time using supervised learning.
* Personalizing interest rates based on credit risk via regression models.
* Providing an interactive web interface for both applicants and credit analysts.

> The result: increased approval efficiency, reduced default rates, and optimized yield on credit portfolios.

---

## Core Capabilities

### AI-Driven Loan Decisioning

Classifies applicants into "Approved" or "Declined" based on input attributes using trained machine learning classifiers (e.g., Random Forest, XGBoost).

### Dynamic Interest Rate Prediction

Utilizes regression models to assign personalized interest rates based on predicted creditworthiness, enabling adaptive risk-based pricing.

### Interactive Frontend

A responsive, browser-based interface built with HTML, CSS, and JavaScript allows users to submit loan requests and view instant predictions.

### Explainability & Insights

Integrates feature importance and interpretable outputs to support explainable AI (XAI) in regulatory-sensitive environments.

---

## Architecture Overview

```plaintext
[User Input]
     ↓
[Frontend (HTML/CSS/JS)]
     ↓
[REST API (Flask or FastAPI)]
     ↓
[ML Pipeline]
     ├── Classification Model → Loan Decision
     └── Regression Model     → Interest Rate
     ↓
[Output Display & Insights]
```

---

## Technology Stack

| Layer            | Technologies Used                          |
| ---------------- | ------------------------------------------ |
| UI               | HTML5, CSS3, JavaScript                    |
| Backend          | Python (Flask or FastAPI)                  |
| Machine Learning | scikit-learn, pandas, NumPy                |
| Deployment       | Docker (optional), GitHub Pages (frontend) |
| Model Format     | `.pkl` (joblib serialization)              |

---

## Repository Structure

```bash
Loan-Genius-AI/
├── data/                      # Sample and training datasets
├── models/                    # Pre-trained ML models (.pkl)
├── static/                    # CSS and JS assets
│   ├── style.css
│   └── script.js
├── templates/                 # HTML templates
│   └── index.html
├── app.py                     # Flask/FastAPI backend API
├── preprocessing.py           # Data transformation and encoding
├── train_model.py             # Model training pipeline
├── requirements.txt
└── README.md
```

---

## Getting Started

### Prerequisites

* Python 3.8+
* pip / virtualenv
* Git

### Installation & Execution

```bash
# Clone the repository
git clone https://github.com/RahulDasari1/Loan-Genius-AI.git
cd Loan-Genius-AI

# Install dependencies
pip install -r requirements.txt

# Run the Flask app
python app.py
```

Visit `http://localhost:5000` in your browser to use the application.

---

## Sample Input Parameters

| Parameter         | Value    |
| ----------------- | -------- |
| Applicant Income  | ₹850,000 |
| Loan Amount       | ₹250,000 |
| Credit Score      | 750      |
| Employment Status | Salaried |
| Loan Term         | 5 years  |

**Output:**

* Loan Approved
* Recommended Interest Rate: 6.7% APR
* Risk Profile: Low Risk

---

## Model Training

To retrain the models on a custom dataset:

```bash
python train_model.py
```

This script preprocesses the data, trains both classification and regression models, and saves them in the `models/` directory.

---

## Business Use Cases

* **Retail Lending** – Automate consumer loan approvals and personalize pricing.
* **SME Finance** – Evaluate business risk for small and medium enterprises.
* **Digital Credit Platforms** – Plug-and-play decision engine for BNPL, microfinance, etc.
* **Robo-Advisory** – Dynamic credit recommendations based on portfolio health.

---

## Compliance & Ethical AI

* Supports model explainability using SHAP (optional)
* GDPR-friendly with no PII stored or transmitted
* Promotes fair lending practices through transparency

---

## Contribution Guidelines

We welcome contributions and enhancements:

```bash
# Fork the repository
# Create a new branch
git checkout -b feature/your-feature-name

# Commit and push
git commit -m "Add your feature"
git push origin feature/your-feature-name

# Open a Pull Request
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Contact

**Rahul Dasari**
LinkedIn - https://linkedin.com/in/rahuldasari
GitHub - https://github.com/RahulDasari1

Have questions or want to collaborate? Feel free to open an issue or reach out directly.
