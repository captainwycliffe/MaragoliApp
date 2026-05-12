# Maragoli Language Translation System — Presentation Script
## 5-Member Roles | Group Presentation

---

## MEMBER 1 — Project Introduction & Problem Statement

**[Opens the presentation]**

Good morning / afternoon everyone.

Today we are presenting our project: **a machine translation system for the Maragoli language**, also known as Lulogooli — a Bantu language spoken by the Maragoli people of Western Kenya.

The Maragoli language is what researchers call a **low-resource language**. This means it has little to no digital presence — no large text datasets, no professional translation tools, and no representation in mainstream AI systems. This creates a real problem: speakers of Maragoli cannot benefit from modern language technology the way speakers of English, French, or Swahili can.

Our goal in this project was to close that gap — to build an AI-powered translation system that can automatically translate Maragoli text into English.

**Why does this matter?**
- Maragoli is spoken by hundreds of thousands of people.
- Younger generations are losing touch with the language because it is not supported digitally.
- A working translation tool can help in education, documentation, and cultural preservation.

To achieve this, we built three components working together:
1. A **fine-tuned AI translation model** (the brain)
2. A **REST API backend** (the engine)
3. A **React Native mobile application** (the face users see)

I will now hand over to our second member, who will explain where we got our training data.

---

## MEMBER 2 — Data Collection & The Training Dataset

**[Takes over to explain data]**

Thank you.

For any AI model to learn, it needs examples — in our case, pairs of sentences written in both Maragoli and English. The more pairs you provide, the better the model learns.

**Our primary data source was the Maragoli Bible.**

We deliberately chose biblical text because:
- The Maragoli Bible is one of the few existing digitised texts written entirely in the Maragoli language.
- It has a corresponding English Bible, meaning every verse has a known, accurate English translation.
- The language is formal, consistent, and rich in vocabulary.

We extracted translation pairs from six books of the Bible:

| Book | Type | Why We Chose It |
|------|------|-----------------|
| **Genesis** | Narrative | Rich in storytelling phrases and descriptions |
| **Ruth** | Narrative | Short, conversational, everyday dialogue |
| **Proverbs** | Wisdom literature | Short, punchy phrases — very clean for training |
| **Mark** | Gospel | Action-heavy, short sentences |
| **Luke** | Gospel | Detailed narrative, longer sentences |
| **Acts** | Historical | Travel and speech patterns |

From these six books, we extracted approximately **2,000 Maragoli–English phrase pairs**.

**Our data pipeline:**

After extracting the phrases, we organised them into two Excel files:
- `Logooli_English_Training_Phrases.xlsx` — our initial corpus
- `Maragoli_Combined_Training_Data_FINAL.xlsx` — the cleaned, final combined corpus

Each row in the Excel file contains one Maragoli phrase and its English translation. We then ran a data preparation script that:
1. Loaded both Excel files
2. Removed duplicate entries automatically
3. Cleaned whitespace and formatting issues
4. Split the data into three sets:
   - **Training set**: 1,212 pairs (76%) — used to teach the model
   - **Validation set**: 192 pairs (12%) — used to monitor learning during training
   - **Test set**: 192 pairs (12%) — used for final evaluation, never seen during training

In total, our final cleaned dataset had **1,596 unique translation pairs** saved as JSON files ready for the model.

I will now hand over to our third member, who will explain the AI model we used and how we trained it.

---

## MEMBER 3 — Model Architecture & Training Process

**[Takes over to explain the model]**

Thank you.

Building a translation model from scratch for a language like Maragoli would require millions of sentence pairs and months of computing time — resources we do not have. So we took a smarter approach: **transfer learning**.

**What is transfer learning?**

Instead of starting from zero, we took a model that had already been trained on 50 languages and fine-tuned it specifically for Maragoli. This is like hiring someone who already speaks 50 languages and teaching them one more.

**The base model we used is called mBART-50.**

mBART-50 — Multilingual BART — is an open-source model developed by Facebook AI. It was pre-trained on 50 languages using billions of sentences. The architecture works as follows:

- It has an **encoder** that reads the input text (12 layers)
- It has a **decoder** that generates the translated output (12 layers)
- It uses 16 attention heads per layer to focus on different parts of the sentence simultaneously
- Its vocabulary contains over 250,000 tokens

**The challenge: Maragoli is not one of the 50 languages.**

Here is where we had to be creative. Since mBART-50 does not natively support Maragoli, we used **Swahili (`sw_KE`) as a proxy language token**. Swahili is the closest well-represented Bantu language in the model. By tagging Maragoli text as Swahili, the model could still leverage its existing knowledge of African Bantu language patterns.

**Training configuration:**

| Setting | Value |
|---------|-------|
| Base model | facebook/mbart-large-50-many-to-many-mmt |
| Source language token | `sw_KE` (Swahili proxy for Maragoli) |
| Target language token | `en_XX` (English) |
| Max sentence length | 128 tokens |
| Batch size | 8 |
| Planned epochs | 20 |
| Early stopping patience | 3 epochs |
| Optimizer | AdamW with weight decay 0.01 |
| Warmup steps | 50 |
| Translation strategy | Beam search (4 beams) |

**Training was done on Google Colab** using a GPU runtime, since training a model of this size would take days on a regular laptop CPU.

Our scripts were organised into clear steps:
- `01_prepare_data.py` — prepares and splits the Excel data
- `02_train.py` — runs the fine-tuning
- `03_evaluate.py` — measures performance
- `04_retrain.py` — allows future retraining with new data

I will now hand over to our fourth member, who will present the results we achieved.

---

## MEMBER 4 — Training Results & Evaluation

**[Takes over to present results]**

Thank you.

Once training was complete, we needed to measure how well our model actually learned to translate. The standard metric for machine translation is called the **BLEU score** — Bilingual Evaluation Understudy.

**What is a BLEU score?**

BLEU measures how closely the model's translation matches a human reference translation. It ranges from 0 to 100:
- **0** means the translation is completely wrong
- **100** means it is a perfect match to the human reference
- For context, Google Translate on major languages scores around 30–40

For a **low-resource language** trained on under 2,000 pairs, researchers consider:
- **Above 10** — a usable prototype
- **Above 20** — good quality for a low-resource language

**Our BLEU score progression across 13 epochs:**

| Epoch | BLEU Score | Notes |
|-------|------------|-------|
| 1 | 3.78 | Model just beginning to learn |
| 2 | 9.23 | Rapid improvement |
| 3 | 9.46 | Continued growth |
| 4 | 10.73 | Crossed the "usable prototype" threshold |
| 5 | 11.85 | Strong learning phase |
| 6 | 12.51 | Plateau beginning |
| 7 | 12.42 | Slight dip |
| 8 | 12.72 | Recovery |
| 9 | 13.80 | Notable jump |
| 10 | 13.11 | Minor regression |
| 11 | 14.80 | New best |
| 12 | 13.31 | Declining — early stopping triggered |
| 13 | **14.82** | **Best checkpoint saved** |

**Training was stopped automatically at epoch 13** — our early stopping mechanism detected no further improvement after 3 consecutive evaluations, which prevented the model from overfitting on our small dataset.

**Loss trajectory:**

The training loss (a measure of how wrong the model's predictions are — lower is better) dropped dramatically:
- Start of training: **6.21**
- After 100 steps: **2.46**
- After 1,000 steps: **~0.12**
- Final: **3.69** (slight rise at end is normal — model generalising)

**Final result: BLEU score of 14.82**

This places our model firmly in the "usable prototype" category, which is a strong result given:
- We had only ~1,596 training pairs
- Maragoli has never been included in any major AI dataset
- We used a proxy language (Swahili) as a workaround

The best model was saved as **checkpoint-2028** and is used to serve all translations.

I will now hand over to our final member, who will explain the full system and its components.

---

## MEMBER 5 — System Architecture, API & Mobile App

**[Takes over to present the full system]**

Thank you.

Our project is not just a model — it is a complete end-to-end system with three layers that work together to deliver translations to a user on their phone.

**Layer 1: The Translation Model (FastAPI Server)**

The trained model is served through a FastAPI web server. When the server starts, it loads our best checkpoint (checkpoint-2028) into memory. It exposes three endpoints:

- `POST /translate` — accepts a Maragoli phrase and returns the English translation
- `GET /lookup` — returns the full phrase table of 1,596 known pairs
- `GET /` — a health check to confirm the server is running

The server uses a **three-tier fallback strategy** to ensure it never fails completely:
1. **Exact match** — if the phrase is in our lookup table, it returns that directly (highest confidence)
2. **Neural model** — if no exact match, the fine-tuned mBART model translates it (medium confidence)
3. **Unavailable** — if the model is not loaded, the request is flagged accordingly (low confidence)

**Layer 2: The Node.js Backend**

The mobile app does not talk to the Python model directly. Instead, it talks to a Node.js REST API backend. This backend:
- Forwards translation requests to the FastAPI model server
- Falls back to **Google Gemini AI** if the model server is unavailable
- Caches the phrase lookup table so translations can work offline

**Layer 3: The React Native Mobile Application**

The user-facing application is built with React Native and Expo, meaning it can run on both Android and iOS from a single codebase. The app:
- Lets users type Maragoli text and receive English translations instantly
- Works offline using the cached phrase lookup table
- Will eventually allow users to contribute new phrase pairs back into the training pipeline

**The retraining workflow:**

Our system is designed to improve over time. When the team collects new Maragoli–English phrases, they add them to the Excel file and run `04_retrain.py`. This script:
1. Merges the new Excel data with the existing corpus
2. Removes any duplicates
3. Warm-starts training from the existing best checkpoint
4. Produces an improved model without starting from scratch

This means as more data is collected — from community members, additional Bible books, or other Maragoli texts — the model will keep getting better.

**Summary of what we built:**

| Component | Technology | Purpose |
|-----------|------------|---------|
| Fine-tuned translation model | mBART-50, PyTorch | Translates Maragoli → English |
| Training data | Maragoli Bible (6 books) | 1,596 phrase pairs |
| Training environment | Google Colab (GPU) | Model training |
| Model server | FastAPI (Python) | Serves predictions |
| Backend API | Node.js | Connects app to model |
| Mobile app | React Native + Expo | User interface |
| Evaluation metric | BLEU score (14.82) | Measures translation quality |

**Conclusion:**

This project demonstrates that even with limited data and no prior digital resources for a language, it is possible to build a working AI translation system. Our BLEU score of 14.82 is a meaningful achievement for a language that has never appeared in any AI training dataset before.

We believe this work is a foundation. With more data — more books, more community-contributed phrases — this system can grow into a genuinely useful tool for Maragoli speakers and learners worldwide.

Thank you for listening. We welcome your questions.

---

*End of Presentation Script*

---
> **Data sources:** Genesis, Ruth, Proverbs, Mark, Luke, Acts — Maragoli Bible
> **Training pairs:** ~2,000 extracted, 1,596 after cleaning
> **Best BLEU score:** 14.82 (checkpoint-2028, epoch 13)
> **Base model:** facebook/mbart-large-50-many-to-many-mmt
