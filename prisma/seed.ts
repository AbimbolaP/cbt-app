import { PrismaClient } from "../src/generated/prisma";
const prisma = new PrismaClient();

async function main() {
  await prisma.question.createMany({
    data: [
      {
        primary: "Who was the first President of the United States?",
        option1: "George Washington",
        option2: "Thomas Jefferson",
        option3: "Abraham Lincoln",
        option4: "John Adams",
        answer: "George Washington",
      },
      {
        primary: "In which year did World War II end?",
        option1: "1940",
        option2: "1945",
        option3: "1939",
        option4: "1950",
        answer: "1945",
      },
      {
        primary: "Who discovered America in 1492?",
        option1: "Christopher Columbus",
        option2: "Leif Erikson",
        option3: "Ferdinand Magellan",
        option4: "Marco Polo",
        answer: "Christopher Columbus",
      },
    ]
  })

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })