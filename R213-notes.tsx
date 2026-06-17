import { useState } from "react";

const CHAPTERS = [
  {
    id: "suites",
    title: "Chapitre 1 — Suites & Signaux",
    color: "#4f7c5f",
    sections: [
      {
        title: "Définitions clés",
        type: "formulas",
        items: [
          { label: "Suite par expression", formula: "uₙ = g(n)", desc: "Chaque terme calculé directement depuis n." },
          { label: "Suite récurrente", formula: "uₙ₊₁ = g(uₙ),  u₀ donné", desc: "Chaque terme calculé à partir du précédent." },
          { label: "Kronecker", formula: "δ[n] = 1 si n=0, 0 sinon\nδ[n−k] = 1 si n=k, 0 sinon", desc: "" },
          { label: "Échelon unité", formula: "u[n] = 1 si n≥0,  0 si n<0", desc: "Signal discret de référence" },
          { label: "Décomposition en Kronecker", formula: "x[n] = ∑ x(k)·δ[n−k]  (k=−∞..+∞)", desc: "Tout signal = somme d'impulsions pondérées" },
          { label: "Périodicité sinus discret", formula: "x[n]=A·sin(θn+φ) périodique  ⟺  2π/θ ∈ ℤ", desc: "Un sinus continu périodique ne l'est pas forcément après discrétisation !" },
        ],
      },
      {
        title: "🔢 Suites géométriques — tout savoir",
        type: "bigtable",
        color: "#4f7c5f",
        subsections: [
          {
            heading: "Définition & terme général",
            items: [
              { label: "Récurrence", formula: "uₙ₊₁ = q · uₙ   (q ∈ ℝ*, q ≠ 0)", desc: "" },
              { label: "Terme général (depuis u₀)", formula: "uₙ = u₀ · qⁿ", desc: "Toujours partir du PREMIER terme de la suite." },
              { label: "Terme général (depuis uₚ)", formula: "uₙ = uₚ · q^(n−p)", desc: "Si la suite démarre à p (ex: p=1, p=2…), on utilise uₙ = u₁·q^(n−1)" },
            ],
          },
          {
            heading: "Calcul de somme — ATTENTION au rang de départ",
            items: [
              { label: "Formule générale", formula: "∑(k=p → n) uₖ  =  (1er terme) · (1 − q^(nb de termes)) / (1 − q)", desc: "⚠️ si q ≠ 1.  Le nb de termes = n − p + 1" },
              { label: "Cas k commence à 0", formula: "∑(k=0 → n) u₀·qᵏ  =  u₀ · (1 − q^(n+1)) / (1 − q)", desc: "Il y a n+1 termes (de 0 à n inclus)" },
              { label: "Cas k commence à 1", formula: "∑(k=1 → n) u₁·q^(k−1)  =  u₁ · (1 − qⁿ) / (1 − q)", desc: "Il y a n termes (de 1 à n inclus)" },
              { label: "Cas k commence à p (général)", formula: "∑(k=p → n) uₖ  =  uₚ · (1 − q^(n−p+1)) / (1 − q)", desc: "1er terme × formule avec nb termes = n−p+1" },
              { label: "Cas q = 1", formula: "∑(k=p → n) uₖ  =  u₀ · (n − p + 1)", desc: "Tous les termes sont égaux à u₀, on les additionne simplement." },
              { label: "Comment compter les termes ?", formula: "De k=p à k=n  →  il y a  n − p + 1  termes\nExemple : k=2 à k=5  →  5−2+1 = 4 termes", desc: "✅ Toujours vérifier le nb de termes avant d'appliquer la formule !" },
            ],
          },
          {
            heading: "Monotonie (si u₀ > 0)",
            items: [
              { label: "q > 1", formula: "Suite strictement croissante", desc: "" },
              { label: "0 < q < 1", formula: "Suite strictement décroissante", desc: "" },
              { label: "q = 1", formula: "Suite constante (tous les termes = u₀)", desc: "" },
              { label: "q < 0", formula: "Suite non monotone (alterne positif/négatif)", desc: "Ex: q=−½ → termes alternent de signe" },
            ],
          },
          {
            heading: "Convergence",
            items: [
              { label: "|q| < 1  (−1 < q < 1)", formula: "qⁿ → 0  ⟹  uₙ → 0  ⟹  CONVERGE", desc: "Ex: q=0,5 → 0,5ⁿ → 0" },
              { label: "q = 1", formula: "uₙ = u₀ constante  ⟹  CONVERGE vers u₀", desc: "" },
              { label: "q > 1", formula: "uₙ → +∞  ⟹  DIVERGE vers +∞", desc: "Ex: q=2 → 2ⁿ → +∞" },
              { label: "q ≤ −1", formula: "qⁿ n'a pas de limite  ⟹  DIVERGE", desc: "Ex: q=−1 → (−1)ⁿ alterne entre +1 et −1, pas de limite" },
              { label: "Résumé", formula: "Converge  ⟺  |q| < 1  (ou q=1 trivial)\nDiverge   ⟺  |q| > 1  ou  q ≤ −1", desc: "" },
            ],
          },
        ],
      },
      {
        title: "🔢 Suites arithmétiques — tout savoir",
        type: "bigtable",
        color: "#4f7c5f",
        subsections: [
          {
            heading: "Définition & terme général",
            items: [
              { label: "Récurrence", formula: "uₙ₊₁ = uₙ + r   (r ∈ ℝ)", desc: "" },
              { label: "Terme général (depuis u₀)", formula: "uₙ = u₀ + n·r", desc: "" },
              { label: "Terme général (depuis uₚ)", formula: "uₙ = uₚ + (n−p)·r", desc: "Si la suite démarre à p, on décale l'indice." },
            ],
          },
          {
            heading: "Calcul de somme — ATTENTION au rang de départ",
            items: [
              { label: "Formule générale", formula: "∑(k=p → n) uₖ  =  (nb de termes) × (1er terme + dernier terme) / 2", desc: "= (n−p+1) × (uₚ + uₙ) / 2" },
              { label: "Cas k commence à 0", formula: "∑(k=0 → n) uₖ  =  (n+1) × (u₀ + uₙ) / 2", desc: "n+1 termes, 1er = u₀, dernier = uₙ" },
              { label: "Cas k commence à 1", formula: "∑(k=1 → n) k  =  n(n+1)/2", desc: "Somme des entiers de 1 à n (cas r=1, u₁=1)" },
              { label: "Cas k commence à p (général)", formula: "∑(k=p → n) uₖ  =  (n−p+1) × (uₚ + uₙ) / 2", desc: "Toujours : nb termes × moyenne du 1er et du dernier" },
              { label: "Formule utile : ∑k²", formula: "∑(k=1 → n) k²  =  n(n+1)(2n+1)/6", desc: "À connaître pour les démonstrations par récurrence" },
              { label: "Astuce mnémotechnique", formula: "Somme = nb_termes × (début + fin) / 2\nComme une moyenne × nb termes", desc: "" },
            ],
          },
          {
            heading: "Monotonie",
            items: [
              { label: "r > 0", formula: "Suite strictement croissante", desc: "uₙ₊₁ − uₙ = r > 0" },
              { label: "r < 0", formula: "Suite strictement décroissante", desc: "uₙ₊₁ − uₙ = r < 0" },
              { label: "r = 0", formula: "Suite constante", desc: "Tous les termes sont égaux à u₀" },
            ],
          },
          {
            heading: "Convergence",
            items: [
              { label: "r ≠ 0", formula: "uₙ → +∞ si r>0  |  uₙ → −∞ si r<0\n⟹  TOUJOURS DIVERGE si r ≠ 0", desc: "Une suite arithmétique non constante diverge toujours." },
              { label: "r = 0", formula: "uₙ = u₀ pour tout n  ⟹  CONVERGE vers u₀", desc: "Suite constante = cas trivial." },
            ],
          },
        ],
      },
      {
        title: "📈 Convergence & limites — tous les cas",
        type: "bigtable",
        color: "#4f7c5f",
        subsections: [
          {
            heading: "Définitions",
            items: [
              { label: "Convergence", formula: "lim(n→+∞) uₙ = L  (L ∈ ℝ)  ⟺  uₙ se rapproche de L", desc: "La suite admet une limite FINIE réelle." },
              { label: "Divergence vers +∞", formula: "lim uₙ = +∞  :  uₙ dépasse tout réel A", desc: "" },
              { label: "Divergence vers −∞", formula: "lim uₙ = −∞  :  uₙ descend sous tout réel −A", desc: "" },
              { label: "Divergence (pas de limite)", formula: "lim uₙ n'existe pas  :  suite qui oscille sans se stabiliser", desc: "Ex: (−1)ⁿ alterne entre −1 et +1, pas de limite." },
            ],
          },
          {
            heading: "Théorèmes à connaître",
            items: [
              { label: "Th. suites monotones (P3)", formula: "Croissante + majorée  ⟹  converge\nDécroissante + minorée  ⟹  converge", desc: "Ne donne pas la valeur de la limite, juste son existence." },
              { label: "Th. des gendarmes (P5)", formula: "Si uₙ ≤ vₙ ≤ wₙ\net  lim uₙ = lim wₙ = a\n⟹  lim vₙ = a", desc: "Utile quand on encadre une suite entre deux suites qui convergent vers le même a." },
              { label: "Th. de comparaison (P4)", formula: "Si uₙ ≤ vₙ  et  lim uₙ = +∞  ⟹  lim vₙ = +∞\nSi uₙ ≤ vₙ  et  lim vₙ = −∞  ⟹  lim uₙ = −∞", desc: "" },
              { label: "Unicité de la limite", formula: "Une suite convergente a une limite UNIQUE.", desc: "" },
            ],
          },
          {
            heading: "Limites de somme",
            items: [
              { label: "L + L'", formula: "lim(uₙ+vₙ) = L + L'", desc: "" },
              { label: "+∞ + L", formula: "= +∞", desc: "" },
              { label: "−∞ + L", formula: "= −∞", desc: "" },
              { label: "+∞ + (+∞)", formula: "= +∞", desc: "" },
              { label: "−∞ + (−∞)", formula: "= −∞", desc: "" },
              { label: "+∞ + (−∞)", formula: "= FORME INDÉTERMINÉE (F.I.)", desc: "⚠️ Pas de règle générale, factoriser ou changer de forme." },
            ],
          },
          {
            heading: "Limites de produit",
            items: [
              { label: "L × L'", formula: "= L·L'", desc: "" },
              { label: "b × L  (b≠0)", formula: "= b·L", desc: "" },
              { label: "+∞ × (+∞)", formula: "= +∞", desc: "" },
              { label: "+∞ × (−∞)", formula: "= −∞", desc: "" },
              { label: "L>0 × (+∞)", formula: "= +∞", desc: "" },
              { label: "L<0 × (+∞)", formula: "= −∞", desc: "" },
              { label: "0 × (±∞)", formula: "= FORME INDÉTERMINÉE (F.I.)", desc: "⚠️ Factoriser." },
            ],
          },
          {
            heading: "Limites de quotient",
            items: [
              { label: "L / L'  (L'≠0)", formula: "= L/L'", desc: "" },
              { label: "L / (±∞)", formula: "= 0", desc: "" },
              { label: "±∞ / L  (L>0)", formula: "= ±∞", desc: "" },
              { label: "±∞ / L  (L<0)", formula: "Changer de signe", desc: "Ex: +∞ / L<0 = −∞" },
              { label: "L / 0⁺", formula: "= +∞ si L>0,  −∞ si L<0", desc: "" },
              { label: "L / 0⁻", formula: "= −∞ si L>0,  +∞ si L<0", desc: "" },
              { label: "±∞ / ±∞", formula: "= FORME INDÉTERMINÉE (F.I.)", desc: "⚠️ Factoriser par le terme dominant." },
              { label: "0 / 0", formula: "= FORME INDÉTERMINÉE (F.I.)", desc: "⚠️ Simplifier." },
            ],
          },
          {
            heading: "Cas courants à l'examen",
            items: [
              { label: "Fraction de polynômes", formula: "lim (aₙ·nᵏ + …)/(bₙ·nᵐ + …)\n→ Factoriser par nᵏ au num. et nᵐ au dén.", desc: "Ex: (3n²+7n)/(2n²−1) → factoriser n² → lim = 3/2" },
              { label: "Suite avec (−1)ⁿ", formula: "(−1)ⁿ n'a pas de limite\n⟹ Si uₙ = (−1)ⁿ·vₙ avec vₙ→0 : utiliser gendarmes\n|uₙ| = |vₙ| → 0  ⟹  uₙ → 0", desc: "" },
              { label: "Suite avec sin ou cos", formula: "sin(…) borné entre −1 et 1\n⟹ Si uₙ = sin(…)/n → gendarmes : −1/n ≤ uₙ ≤ 1/n → 0", desc: "" },
              { label: "Suite n!", formula: "n! → +∞  (diverge)\nMais eⁿ/n! → 0 car n! croît plus vite que eⁿ", desc: "" },
              { label: "Suite avec ln", formula: "ln(n) → +∞ mais très lentement\nln(n)/n → 0  (n domine ln)", desc: "" },
            ],
          },
        ],
      },
      {
        title: "📐 Monotonie — méthode complète",
        type: "bigtable",
        color: "#4f7c5f",
        subsections: [
          {
            heading: "Les 3 méthodes",
            items: [
              { label: "Méthode 1 — Différence (TOUJOURS utilisable)", formula: "Calculer  uₙ₊₁ − uₙ\n\n> 0  ⟹  strictement croissante\n≥ 0  ⟹  croissante\n< 0  ⟹  strictement décroissante\n≤ 0  ⟹  décroissante\n= 0  ⟹  constante", desc: "✅ Méthode universelle. À utiliser par défaut." },
              { label: "Méthode 2 — Quotient (si uₙ > 0 pour tout n)", formula: "Calculer  uₙ₊₁ / uₙ\n\n> 1  ⟹  strictement croissante\n< 1  ⟹  strictement décroissante\n= 1  ⟹  constante", desc: "✅ Pratique avec les factorielles, puissances, produits." },
              { label: "Méthode 3 — Fonction (si uₙ = g(n))", formula: "Poser f(x) = g(x), étudier f'(x)\n\nf'(x) > 0 sur [p;+∞[  ⟹  (uₙ) croissante à partir du rang p\nf'(x) < 0 sur [p;+∞[  ⟹  (uₙ) décroissante à partir du rang p", desc: "✅ Utilise les outils des fonctions réelles. Trouver le rang p à partir duquel c'est valable." },
            ],
          },
          {
            heading: "Vocabulaire & précisions",
            items: [
              { label: "Monotone à partir du rang p", formula: "Si la propriété n'est vraie que pour n ≥ p\n⟹ préciser : '(uₙ) est croissante à partir du rang p'", desc: "" },
              { label: "Suite non monotone", formula: "Ni croissante ni décroissante sur tout ℕ\nEx: (−1)ⁿ, suites oscillantes", desc: "" },
              { label: "Majorée / minorée / bornée", formula: "Majorée : ∃M tel que uₙ ≤ M pour tout n\nMinorée : ∃m tel que uₙ ≥ m pour tout n\nBornée : majorée ET minorée", desc: "" },
            ],
          },
        ],
      },
      {
        title: "Récurrence — Méthode complète",
        type: "steps",
        steps: [
          { n: 1, title: "Énoncer P(n)", desc: "Écrire explicitement la propriété à démontrer pour tout n ≥ n₀.\nEx: P(n) : uₙ = 2·(−1/5)ⁿ" },
          { n: 2, title: "Initialisation", desc: "Vérifier que P(n₀) est vraie (calcul direct).\nEx: P(0) : u₀ = 2·(−1/5)⁰ = 2 ✓" },
          { n: 3, title: "Hypothèse de récurrence (HR)", desc: "Supposer que P(n) est vraie pour un n ≥ n₀ fixé.\nEx: On suppose uₙ = 2·(−1/5)ⁿ" },
          { n: 4, title: "Hérédité — démontrer P(n+1)", desc: "En utilisant HR, montrer P(n+1).\nEx: uₙ₊₁ = −(1/5)·uₙ = −(1/5)·2·(−1/5)ⁿ = 2·(−1/5)ⁿ⁺¹ ✓" },
          { n: 5, title: "Conclusion", desc: "Par le principe de récurrence, P(n) est vraie pour tout n ≥ n₀." },
        ],
      },
    ],
  },
  {
    id: "matrices",
    title: "Chapitre 2 — Matrices & Vecteurs",
    color: "#5a4fa0",
    sections: [
      {
        title: "Opérations essentielles",
        type: "formulas",
        items: [
          { label: "Addition", formula: "A + B = (aᵢⱼ + bᵢⱼ)  — même taille obligatoire", desc: "" },
          { label: "Multiplication scalaire", formula: "kA = (k·aᵢⱼ)", desc: "" },
          { label: "Produit matriciel", formula: "cᵢⱼ = ∑ aᵢₖ·bₖⱼ  (k=1..q)", desc: "A est p×q et B est q×r ⟹ AB est p×r" },
          { label: "Non-commutativité", formula: "AB ≠ BA en général", desc: "⚠️ Ne pas inverser l'ordre !" },
          { label: "Transposée", formula: "(A^T)ᵢⱼ = Aⱼᵢ  — lignes ↔ colonnes", desc: "(AB)^T = B^T · A^T" },
          { label: "Produit scalaire ℝ²", formula: "⟨u,v⟩ = u₁v₁ + u₂v₂ = u^T·v", desc: "" },
          { label: "Produit scalaire ℝ³", formula: "⟨u,v⟩ = u₁v₁ + u₂v₂ + u₃v₃", desc: "" },
          { label: "Norme", formula: "‖u‖ = √⟨u,u⟩ = √(u₁²+u₂²+…)", desc: "" },
          { label: "Orthogonalité", formula: "u ⊥ v  ⟺  ⟨u,v⟩ = 0", desc: "" },
          { label: "Équation de droite (vecteur normal)", formula: "a(x−xₐ) + b(y−yₐ) = 0  avec n⃗=(a,b) normal", desc: "Droite ax+by+c=0 : directeur (−b,a), normal (a,b)" },
        ],
      },
      {
        title: "Déterminant",
        type: "formulas",
        items: [
          { label: "det 2×2", formula: "|a b|\n|c d|  = ad − bc", desc: "" },
          { label: "det 3×3 (Sarrus)", formula: "= a₁₁(a₂₂a₃₃−a₂₃a₃₂) − a₁₂(a₂₁a₃₃−a₂₃a₃₁) + a₁₃(a₂₁a₃₂−a₂₂a₃₁)", desc: "Développement par la 1ʳᵉ ligne" },
          { label: "Inversibilité", formula: "A inversible  ⟺  det(A) ≠ 0", desc: "" },
          { label: "det(A⁻¹)", formula: "det(A⁻¹) = 1/det(A)", desc: "" },
        ],
      },
      {
        title: "Pivot de Gauss — Résolution Ax=b",
        type: "steps",
        steps: [
          { n: 1, title: "Former la matrice augmentée M = (A|b)", desc: "Écrire les coefficients et le second membre dans une même matrice." },
          { n: 2, title: "Éliminer sous la diagonale (gauche→droite)", desc: "Pour chaque pivot aᵢᵢ : opération Lⱼ ← p·Lⱼ − k·Lᵢ pour annuler la colonne i sous la ligne i." },
          { n: 3, title: "Lire le cas obtenu", desc: "• Ligne [0 0…0 | c≠0] ⟹ S = ∅\n• Même nb d'éq. et d'inconnues ⟹ solution unique\n• Plus d'inconnues ⟹ infinité de solutions (paramètre libre)" },
          { n: 4, title: "Remonter (back-substitution)", desc: "Trouver la dernière inconnue puis remonter ligne par ligne." },
        ],
      },
      {
        title: "Matrice inverse — Pivot de Gauss",
        type: "steps",
        steps: [
          { n: 1, title: "Poser M = (A | Iₙ)", desc: "Écrire A à gauche et la matrice identité de même taille à droite." },
          { n: 2, title: "Étape 1 : zéros sous la diagonale", desc: "Appliquer Gauss de gauche à droite. Si une ligne nulle apparaît à gauche ⟹ A non inversible, stop." },
          { n: 3, title: "Étape 2 : zéros au-dessus de la diagonale", desc: "Remonter : annuler les coefficients au-dessus de chaque pivot (de droite à gauche)." },
          { n: 4, title: "Étape 3 : 1 sur la diagonale", desc: "Diviser chaque ligne par son coefficient diagonal pour obtenir Iₙ à gauche." },
          { n: 5, title: "Lire A⁻¹", desc: "La matrice à droite est A⁻¹." },
        ],
      },
      {
        title: "Comatrice & inverse (formule directe)",
        type: "formulas",
        items: [
          { label: "Cofacteur (i,j)", formula: "Cᵢⱼ = (−1)^(i+j) · det(Aᵢⱼ)", desc: "Aᵢⱼ = A sans la ligne i et colonne j" },
          { label: "Matrice inverse via comatrice", formula: "A⁻¹ = (1/det(A)) · com(A)^T", desc: "com(A) = matrice de tous les cofacteurs" },
          { label: "Système de Cramer", formula: "Si det(A) ≠ 0  ⟹  X = A⁻¹·b", desc: "Solution unique, calculer A⁻¹ puis multiplier par b" },
        ],
      },
    ],
  },
];

const EXERCISES = [
  {
    chapter: "suites",
    title: "Modélisation réseau (TD1-Ex4)",
    question: "Un réseau commence avec 100 utilisateurs et augmente de 75% par heure. Après combien d'heures dépasse-t-on 10 000 utilisateurs ?",
    steps: [
      { title: "Modéliser", content: "C₀ = 100, Cₙ₊₁ = 1,75·Cₙ  ⟹  suite géométrique de raison q = 1,75" },
      { title: "Terme général", content: "Cₙ = 100 · (1,75)ⁿ" },
      { title: "Inégalité", content: "Cₙ > 10 000  ⟺  (1,75)ⁿ > 100\n⟺  n·ln(1,75) > ln(100)\n⟺  n > ln(100)/ln(1,75)" },
      { title: "Calculer", content: "ln(100) ≈ 4,605  |  ln(1,75) ≈ 0,5596\n⟹  n > 4,605/0,5596 ≈ 8,23\n⟹  n = 9 heures" },
    ],
  },
  {
    chapter: "suites",
    title: "Récurrence (TD3-Ex2)",
    question: "Suite aₙ₊₁ = 2aₙ − 3, a₀ = 500. Montrer que bₙ = aₙ − 3 est géométrique de raison 2, puis trouver aₙ.",
    steps: [
      { title: "Définir bₙ", content: "bₙ = aₙ − 3  ⟹  b₀ = 500 − 3 = 497" },
      { title: "Montrer géométrique", content: "bₙ₊₁ = aₙ₊₁ − 3 = (2aₙ − 3) − 3 = 2aₙ − 6 = 2(aₙ − 3) = 2·bₙ\n⟹ raison q = 2 ✓" },
      { title: "Terme général bₙ", content: "bₙ = b₀ · 2ⁿ = 497 · 2ⁿ" },
      { title: "En déduire aₙ", content: "aₙ = bₙ + 3 = 497 · 2ⁿ + 3" },
      { title: "Quand aₙ > 2000 ?", content: "497·2ⁿ + 3 > 2000  ⟹  2ⁿ > 1997/497 ≈ 4,018\n2³=8 > 4,018  ⟹  n = 3 (après 3 minutes)" },
    ],
  },
  {
    chapter: "suites",
    title: "Série géométrique (TD4-Ex1) — k commence à 1",
    question: "dₖ = 50·(1,2)ᵏ (k démarre à 1). Consommation totale sur 30 jours ? Entre j20 et j30 ?",
    steps: [
      { title: "Identifier la somme", content: "Dₙ = ∑(k=1 → n) 50·(1,2)ᵏ\n1er terme : d₁ = 50·1,2 = 60\nraison : q = 1,2\nnb termes : n" },
      { title: "Appliquer la formule", content: "Dₙ = d₁ · (1 − qⁿ)/(1 − q)\n= 60 · (1 − 1,2ⁿ)/(1 − 1,2)\n= 60 · (1 − 1,2ⁿ)/(−0,2)\n= 300·(1,2ⁿ − 1)" },
      { title: "Sur 30 jours", content: "D₃₀ = 300·(1,2³⁰ − 1) ≈ 300·(237,38 − 1) ≈ 71 212 Mo" },
      { title: "Entre j20 et j30", content: "= ∑(k=21 → 30) dₖ = D₃₀ − D₂₀\n= 300·(1,2³⁰ − 1,2²⁰)\n≈ 300·(237,38 − 38,34) ≈ 59 712 Mo" },
    ],
  },
  {
    chapter: "suites",
    title: "Convergence — suite avec sin (TD1-Ex3e)",
    question: "Étudier la convergence de uₙ = (1/n)·sin(2nπ/3)  pour n ≥ 1.",
    steps: [
      { title: "Identifier le problème", content: "sin(2nπ/3) oscille entre −1 et +1, pas de limite.\nMais elle est BORNÉE : −1 ≤ sin(2nπ/3) ≤ 1" },
      { title: "Encadrer — théorème des gendarmes", content: "−1/n ≤ (1/n)·sin(2nπ/3) ≤ 1/n\n⟹  −1/n ≤ uₙ ≤ 1/n" },
      { title: "Calculer les limites des bornes", content: "lim(n→+∞) (−1/n) = 0\nlim(n→+∞) (1/n) = 0" },
      { title: "Conclure", content: "Par le théorème des gendarmes :\nlim uₙ = 0  ⟹  (uₙ) CONVERGE vers 0" },
    ],
  },
  {
    chapter: "matrices",
    title: "Pivot de Gauss — système carré (TD7-S1)",
    question: "Résoudre : −2x₁ − 2x₂ + x₃ = 2  |  x₁ − x₂ − 2x₃ = −6  |  3x₁ + x₂ − 2x₃ = −6",
    steps: [
      { title: "Matrice augmentée", content: "[ −2  −2   1 |  2 ]\n[  1  −1  −2 | −6 ]\n[  3   1  −2 | −6 ]" },
      { title: "Échanger L1↔L2 (pivot ≠ 0)", content: "[  1  −1  −2 | −6 ]\n[ −2  −2   1 |  2 ]\n[  3   1  −2 | −6 ]" },
      { title: "L2 ← L2 + 2L1  |  L3 ← L3 − 3L1", content: "[  1  −1  −2 | −6 ]\n[  0  −4  −3 | −10 ]\n[  0   4  −8 |  12 ]" },
      { title: "L3 ← L3 + L2", content: "[  1  −1  −2 | −6 ]\n[  0  −4  −3 | −10 ]\n[  0   0  −11 |  2 ]" },
      { title: "Back-substitution", content: "x₃ = 2/(−11) = −2/11\nx₂ = (−10 + 3·(−2/11))/(−4) = (−116/11)/(−4) = 29/11\nx₁ = −6 + x₂ + 2x₃ = −6 + 29/11 − 4/11 = −6 + 25/11 = −41/11" },
    ],
  },
  {
    chapter: "matrices",
    title: "Inverse par pivot (TD8-Ex3)",
    question: "Soit A = [[0,−4,6],[2,4,0],[4,2,10]]. Calculer det(A) et A⁻¹.",
    steps: [
      { title: "Calculer det(A) — Sarrus", content: "det = 0·(4·10−0·2) − (−4)·(2·10−0·4) + 6·(2·2−4·4)\n= 0 − (−4)·20 + 6·(4−16)\n= 80 + 6·(−12) = 80 − 72 = 8\n⟹ det(A) = 8 ≠ 0  ⟹  A inversible ✓" },
      { title: "Poser (A | I₃) et appliquer Gauss", content: "[ 0 −4  6 | 1 0 0 ]\n[ 2  4  0 | 0 1 0 ]\n[ 4  2 10 | 0 0 1 ]\n→ Échanger L1↔L2, puis éliminer…" },
      { title: "Obtenir (I₃ | A⁻¹)", content: "Continuer jusqu'à avoir I₃ à gauche.\nLa matrice à droite est A⁻¹." },
      { title: "Vérification", content: "Calculer A·A⁻¹ = I₃ pour confirmer." },
    ],
  },
  {
    chapter: "matrices",
    title: "Produit scalaire & droite (TD6-Ex3)",
    question: "Droite d₁ passant par (−5; 2) de vecteur normal n⃗ = (3; 7). Trouver son équation.",
    steps: [
      { title: "Méthode vecteur normal", content: "M(x;y) ∈ d₁  ⟺  AM⃗ · n⃗ = 0\navec A(−5; 2)" },
      { title: "Calculer AM⃗", content: "AM⃗ = (x−(−5); y−2) = (x+5; y−2)" },
      { title: "Produit scalaire = 0", content: "⟨(x+5; y−2), (3; 7)⟩ = 0\n3(x+5) + 7(y−2) = 0\n3x+15 + 7y−14 = 0" },
      { title: "Équation finale", content: "3x + 7y + 1 = 0" },
    ],
  },
];

export default function R213Guide() {
  const [activeChapter, setActiveChapter] = useState("suites");
  const [openSection, setOpenSection] = useState(null);
  const [openExercise, setOpenExercise] = useState(null);
  const [openStep, setOpenStep] = useState({});
  const [tab, setTab] = useState("formulas");
  const [openSubsection, setOpenSubsection] = useState({});

  const chapter = CHAPTERS.find((c) => c.id === activeChapter);
  const exercises = EXERCISES.filter((e) => e.chapter === activeChapter);

  const toggleStep = (exIdx, stepIdx) => {
    setOpenStep((prev) => {
      const key = `${exIdx}-${stepIdx}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const toggleSub = (sectionIdx, subIdx) => {
    setOpenSubsection((prev) => {
      const key = `${sectionIdx}-${subIdx}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#f8f7f4", color: "#1a1a1a" }}>
      <div style={{ background: chapter.color, color: "#fff", padding: "24px 20px 16px", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.75, marginBottom: 4 }}>R213 · Révision Interactive</div>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{chapter.title}</h1>
          <div style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}>
            {CHAPTERS.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActiveChapter(c.id); setOpenSection(null); setOpenExercise(null); setTab("formulas"); setOpenSubsection({}); }}
                style={{
                  background: activeChapter === c.id ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: activeChapter === c.id ? 700 : 400,
                }}
              >
                {c.id === "suites" ? "Suites & Signaux" : "Matrices"}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
            {["formulas", "exercises"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: tab === t ? "#fff" : "transparent",
                  color: tab === t ? chapter.color : "rgba(255,255,255,0.8)",
                  border: "1px solid rgba(255,255,255,0.4)",
                  borderRadius: 6,
                  padding: "4px 12px",
                  fontSize: 12,
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {t === "formulas" ? "📐 Formules & Méthodes" : "✏️ Exercices guidés"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 16px" }}>
        {tab === "formulas" && (
          <div>
            {chapter.sections.map((section, si) => (
              <div key={si} style={{ marginBottom: 12 }}>
                <button
                  onClick={() => setOpenSection(openSection === si ? null : si)}
                  style={{
                    width: "100%",
                    background: openSection === si ? chapter.color : "#fff",
                    color: openSection === si ? "#fff" : "#1a1a1a",
                    border: `1.5px solid ${chapter.color}`,
                    borderRadius: openSection === si ? "10px 10px 0 0" : 10,
                    padding: "14px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: 15,
                    fontWeight: 600,
                    transition: "all 0.2s",
                  }}
                >
                  <span>{section.title}</span>
                  <span style={{ fontSize: 18 }}>{openSection === si ? "▲" : "▼"}</span>
                </button>

                {openSection === si && (
                  <div style={{ background: "#fff", borderRadius: "0 0 10px 10px", border: `1.5px solid ${chapter.color}`, borderTop: "none", padding: 16 }}>

                    {section.type === "formulas" && section.items.map((item, ii) => (
                      <div key={ii} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: ii < section.items.length - 1 ? "1px solid #f0eded" : "none" }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: chapter.color, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{item.label}</div>
                        <div style={{ background: "#f4f2ff", borderRadius: 6, padding: "8px 12px", fontFamily: "monospace", fontSize: 13, color: "#2d2060", whiteSpace: "pre-line", lineHeight: 1.7 }}>{item.formula}</div>
                        {item.desc && <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{item.desc}</div>}
                      </div>
                    ))}

                    {section.type === "bigtable" && section.subsections.map((sub, subi) => (
                      <div key={subi} style={{ marginBottom: 10 }}>
                        <button
                          onClick={() => toggleSub(si, subi)}
                          style={{
                            width: "100%",
                            background: openSubsection[`${si}-${subi}`] ? chapter.color + "22" : "#f8f7f4",
                            border: `1px solid ${chapter.color}55`,
                            borderRadius: openSubsection[`${si}-${subi}`] ? "8px 8px 0 0" : 8,
                            padding: "10px 14px",
                            textAlign: "left",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontWeight: 700,
                            fontSize: 13,
                            color: chapter.color,
                          }}
                        >
                          <span>▸ {sub.heading}</span>
                          <span>{openSubsection[`${si}-${subi}`] ? "▲" : "▼"}</span>
                        </button>
                        {openSubsection[`${si}-${subi}`] && (
                          <div style={{ border: `1px solid ${chapter.color}55`, borderTop: "none", borderRadius: "0 0 8px 8px", padding: "12px 14px", background: "#fdfcff" }}>
                            {sub.items.map((item, ii) => (
                              <div key={ii} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: ii < sub.items.length - 1 ? `1px dashed ${chapter.color}33` : "none" }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: chapter.color, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{item.label}</div>
                                <div style={{ background: "#f0eeff", borderRadius: 6, padding: "8px 12px", fontFamily: "monospace", fontSize: 13, color: "#2d2060", whiteSpace: "pre-line", lineHeight: 1.8 }}>{item.formula}</div>
                                {item.desc && <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{item.desc}</div>}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {section.type === "steps" && section.steps.map((step, si2) => (
                      <div key={si2} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                        <div style={{ minWidth: 28, height: 28, background: chapter.color, color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{step.n}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>{step.title}</div>
                          <div style={{ fontSize: 13, color: "#444", whiteSpace: "pre-line", lineHeight: 1.6 }}>{step.desc}</div>
                        </div>
                      </div>
                    ))}

                    {section.type === "methods" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {section.methods.map((m, mi) => (
                          <div key={mi} style={{ background: "#f8f7fc", borderRadius: 8, padding: 12, borderLeft: `3px solid ${chapter.color}` }}>
                            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6, color: chapter.color }}>{m.title}</div>
                            <div style={{ fontFamily: "monospace", fontSize: 12, whiteSpace: "pre-line", color: "#333" }}>{m.formula}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "exercises" && (
          <div>
            <div style={{ fontSize: 13, color: "#666", marginBottom: 16, background: "#fff", borderRadius: 8, padding: 12, border: "1px solid #e8e6e0" }}>
              💡 Clique sur chaque étape pour la révéler progressivement — essaie d'abord par toi-même !
            </div>
            {exercises.map((ex, ei) => (
              <div key={ei} style={{ marginBottom: 14 }}>
                <button
                  onClick={() => { setOpenExercise(openExercise === ei ? null : ei); setOpenStep({}); }}
                  style={{
                    width: "100%",
                    background: openExercise === ei ? chapter.color : "#fff",
                    color: openExercise === ei ? "#fff" : "#1a1a1a",
                    border: `1.5px solid ${chapter.color}`,
                    borderRadius: openExercise === ei ? "10px 10px 0 0" : 10,
                    padding: "14px 16px",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 8,
                    transition: "all 0.2s",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{ex.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.85, marginTop: 3, fontWeight: 400 }}>{ex.question}</div>
                  </div>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{openExercise === ei ? "▲" : "▼"}</span>
                </button>
                {openExercise === ei && (
                  <div style={{ background: "#fff", borderRadius: "0 0 10px 10px", border: `1.5px solid ${chapter.color}`, borderTop: "none", padding: 16 }}>
                    <div style={{ fontSize: 12, color: "#888", marginBottom: 12 }}>Révèle les étapes une par une :</div>
                    {ex.steps.map((step, si) => (
                      <div key={si} style={{ marginBottom: 10 }}>
                        <button
                          onClick={() => toggleStep(ei, si)}
                          style={{
                            width: "100%",
                            background: openStep[`${ei}-${si}`] ? "#f0eeff" : "#fafafa",
                            border: `1px solid ${openStep[`${ei}-${si}`] ? chapter.color : "#e0ddd8"}`,
                            borderRadius: openStep[`${ei}-${si}`] ? "8px 8px 0 0" : 8,
                            padding: "10px 14px",
                            textAlign: "left",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <span style={{ background: chapter.color, color: "#fff", borderRadius: "50%", width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{si + 1}</span>
                          <span style={{ fontWeight: 600, fontSize: 13, color: chapter.color }}>{step.title}</span>
                          <span style={{ marginLeft: "auto", fontSize: 14, color: "#999" }}>{openStep[`${ei}-${si}`] ? "−" : "+"}</span>
                        </button>
                        {openStep[`${ei}-${si}`] && (
                          <div style={{ background: "#f4f2ff", borderRadius: "0 0 8px 8px", padding: "10px 14px", fontFamily: "monospace", fontSize: 13, whiteSpace: "pre-line", color: "#2d2060", lineHeight: 1.8, borderLeft: `3px solid ${chapter.color}` }}>
                            {step.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
