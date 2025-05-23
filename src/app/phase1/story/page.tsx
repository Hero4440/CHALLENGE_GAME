'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const storyText = `
You are an honorable member of parliament in the Republic of Bean, a unique nation situated in a distant realm beyond Earth. While the country is not wealthy, its citizens enjoy free access to education, healthcare, and various public services. The Republic of Bean prides itself on its multicultural society, comprising three ethnicities and two religious minority groups. Thanks to the country's commitment to secularism, citizens are free to practice their religions without any obstacles.

However, due to safety concerns, the nation follows many monolithic praxis and policies, including a monolingual education system and teaching only Grapes’ history and literature. Also, Grapes’ language, Teanish, is the only official language used for public services.

The largest minority group in the Republic of Bean is the Curly Hairs, who possess distinct ethnic backgrounds and their own language. They have long been advocating for their cultural rights, with a specific focus on education in their mother tongue.

While poverty is not a prevalent issue, the nation suffers from corruption, which angers citizens. In response, protests occasionally occur, sometimes resulting in clashes with the police. Additionally, Grapes seeks to maintain their dominance in the administration and bureaucracy, believing that sharing power would jeopardize the nation's future.

The Republic of Bean shares borders with four countries, three of which are stable. However, Orangenya, the northwestern neighbor, is in conflict. As a result, two million refugees (14% of the population) have entered the Republic. These refugees differ culturally from the citizens.

The economy has grown unstable after a global crisis. Other nations hesitate to support the country, increasing xenophobia and polarization. Parliament has now initiated an education reform to ensure accessible, quality education for all refugees and promote their integration to prevent further unrest.

As a policymaker, your job is to shape this reform. You will select one policy in each of seven domains—access, language, training, curriculum, psychosocial support, financial support, and accreditation—within a 14-unit budget.
`;

export default function StoryPage() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 animate-pulse z-0"></div>
      <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full opacity-20 animate-ping z-0"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Republic of Bean: Background Scenario</h1>
        <div className="whitespace-pre-wrap text-justify leading-relaxed text-md mb-8 text-gray-800">
          {storyText}
        </div>
        <div className="text-center">
          <Button onClick={() => router.push('/phase1/select')}>
            Proceed to Policy Selection
          </Button>
        </div>
      </motion.div>
    </main>
  );
}
