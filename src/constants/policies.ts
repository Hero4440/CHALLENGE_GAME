// policyOptions.ts

export const policyOptions = [
    {
      id: 'accessToEducation',
      title: 'Access to Education',
      options: [
        { id: 'access1', text: 'Limit access to a small percentage of refugee children', cost: 1 },
        { id: 'access2', text: 'Create separate schools/centers for refugee children', cost: 2 },
        { id: 'access3', text: 'Integrate refugee students into mainstream schools', cost: 3 },
      ]
    },
    {
      id: 'languageInstruction',
      title: 'Language Instruction',
      options: [
        { id: 'language1', text: 'Only teach Teanish in schools', cost: 1 },
        { id: 'language2', text: 'Basic Teanish courses for refugees', cost: 2 },
        { id: 'language3', text: 'Comprehensive bilingual education (Teanish + native language)', cost: 3 },
      ]
    },
    {
      id: 'teacherTraining',
      title: 'Teacher Training',
      options: [
        { id: 'teacher1', text: 'No specific training for refugee education', cost: 1 },
        { id: 'teacher2', text: 'Basic training for teachers on refugee challenges', cost: 2 },
        { id: 'teacher3', text: 'Ongoing comprehensive refugee education training', cost: 3 },
      ]
    },
    {
      id: 'curriculumAdaptation',
      title: 'Curriculum Adaptation',
      options: [
        { id: 'curriculum1', text: 'Keep existing national curriculum', cost: 1 },
        { id: 'curriculum2', text: 'Add refugee-focused supplementary materials', cost: 2 },
        { id: 'curriculum3', text: 'Adapt curriculum to include diverse cultural perspectives', cost: 3 },
      ]
    },
    {
      id: 'psychosocialSupport',
      title: 'Psychosocial Support',
      options: [
        { id: 'psychosocial1', text: 'No specific psychosocial support for refugees', cost: 1 },
        { id: 'psychosocial2', text: 'Basic counseling and peer support programs', cost: 2 },
        { id: 'psychosocial3', text: 'Specialized, tailored psychosocial programs for refugees', cost: 3 },
      ]
    },
    {
      id: 'financialSupport',
      title: 'Financial Support',
      options: [
        { id: 'financial1', text: 'Minimal funding for refugee education', cost: 1 },
        { id: 'financial2', text: 'Moderate increase in refugee education funding', cost: 2 },
        { id: 'financial3', text: 'Significant investment in refugee education', cost: 3 },
      ]
    },
    {
      id: 'certification',
      title: 'Certification / Accreditation',
      options: [
        { id: 'cert1', text: 'Only recognize Bean-based education credentials', cost: 1 },
        { id: 'cert2', text: 'Universal evaluation of foreign credentials', cost: 2 },
        { id: 'cert3', text: 'Recognize + offer training to align with national standards', cost: 3 },
      ]
    }
  ];
  