// src/lib/report.ts

export function generateReportText() {
  const participantInfo = JSON.parse(localStorage.getItem('participantInfo') || '{}');
  const finalPackage = JSON.parse(localStorage.getItem('finalPackage') || '{}');
  const reflectionAnswers = JSON.parse(localStorage.getItem('reflectionAnswers') || '{}');
  const feedback = localStorage.getItem('aiFeedback') || 'No feedback generated.';

  const userInfo = `Participant Information:
` +
    `• Age: ${participantInfo.age || 'N/A'}
` +
    `• Nationality: ${participantInfo.nationality || 'N/A'}
` +
    `• Occupation: ${participantInfo.occupation || 'N/A'}
` +
    `• Education Level: ${participantInfo.educationLevel || 'N/A'}
` +
    `• Displacement Experience: ${participantInfo.displacementExperience || 'N/A'}
` +
    `• Location: ${participantInfo.location || 'N/A'}
`;

  const policyLines = Object.entries(finalPackage).map(([cat, opt]: any) => {
    return `• ${cat}: ${opt?.optionText || 'undefined'} (Cost: ${opt?.cost ?? '?'})`;
  }).join('\n');

  const reflectionLines = Object.entries(reflectionAnswers).map(([q, a]) => {
    return `Q: ${q}\nA: ${a}\n`;
  }).join('\n');

  return `--- AI CHALLENGE Game Report ---\n\n` +
         `${userInfo}\n\n` +
         `Final Policy Package:\n${policyLines}\n\n` +
         `Reflection Responses:\n${reflectionLines}\n\n` +
         `AI Feedback:\n${feedback}\n\n` +
         `Thank you for participating!`;
}

export function downloadReport() {
  const text = generateReportText();
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'AI_CHALLENGE_Report.txt';
  a.click();

  URL.revokeObjectURL(url);
}
