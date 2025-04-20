// src/lib/report.ts
interface PolicyOption {
  id: string;
  optionText: string;
  cost: number;
}

export function generateReportText() {
  const participantInfo = JSON.parse(localStorage.getItem('participantInfo') || '{}');
  const finalPackage = JSON.parse(localStorage.getItem('finalPackage') || '{}');
  const reflectionAnswers = JSON.parse(localStorage.getItem('reflectionAnswers') || '{}');
  const feedback = localStorage.getItem('aiFeedback') || 'No feedback generated.';
  const aiVoteReasons = JSON.parse(localStorage.getItem('aiVoteReasons') || '{}');

  const userInfo = `Participant Information:
• Age: ${participantInfo.age || 'N/A'}
• Nationality: ${participantInfo.nationality || 'N/A'}
• Occupation: ${participantInfo.occupation || 'N/A'}
• Education Level: ${participantInfo.educationLevel || 'N/A'}
• Displacement Experience: ${participantInfo.displacementExperience || 'N/A'}
• Location: ${participantInfo.location || 'N/A'}`;

  const typedPackage = finalPackage as Record<string, PolicyOption>;

  const policyLines = Object.entries(typedPackage).map(([cat, opt]) => {
    return `• ${cat}: ${opt.optionText || 'undefined'} (Cost: ${opt.cost ?? '?'})`;
  }).join('\n');

  const groupDiscussionLines = Object.entries(aiVoteReasons).map(([cat, agentMap]) => {
    const agentTexts = Object.entries(agentMap as Record<string, string>).map(
      ([agentName, reason]) => `    - ${agentName}: ${reason}`
    ).join('\n');
    return `• ${cat}:\n${agentTexts}`;
  }).join('\n\n');

  const reflectionLines = Object.entries(reflectionAnswers).map(([q, a]) => {
    return `Q: ${q}\nA: ${a}\n`;
  }).join('\n');

  return `--- AI CHALLENGE Game Report ---

${userInfo}

Final Policy Package:
${policyLines}

Group Discussion (AI Agent Votes & Rationales):
${groupDiscussionLines}

Reflection Responses:
${reflectionLines}

AI Feedback:
${feedback}

Thank you for participating!`;
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
