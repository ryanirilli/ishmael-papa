"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Text,
  Flex,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Particles from "./Particles";

const spring = {
  type: "spring",
  stiffness: 900,
  damping: 15,
};

const springIsh = {
  type: "spring",
  stiffness: 600,
  damping: 15,  
};

type Joke = {
  question: string;
  answer: string;
  owner: string;
};

const jokes: Joke[] = [
  {
    question: "Hey dad, did you get a haircut?",
    answer: "No, I got them all cut!",
    owner: "Cristian",
  },
  {
    question: "Why don't eggs tell jokes?",
    answer: "They'd crack each other up.",
    owner: "Cristian",
  },
  {
    question: "What did the janitor say when he jumped out of the closet?",
    answer: "Supplies!",
    owner: "Cristian",
  },
  {
    question: "What did one wall say to the other?",
    answer: "I'll meet you at the corner.",
    owner: "Cristian",
  },
  {
    question: "What did Baby Corn say to Mama Corn?",
    answer: "Where's Pop Corn?",
    owner: "Cristian",
  },
  {
    question: "When is the best time to go to the dentist?",
    answer: "Tooth-hurtie!",
    owner: "Bryan",
  },
  {
    question: `Spouse: Please go to the store and buy a carton of milk and if they have eggs, get six. 
      Dad: comes back with 6 cartons of milk. 
      Spouse: Why the hell did you buy 6 cartons of milk?`,
    answer: "They had eggs...",
    owner: "Bryan",
  },
  {
    question: "Why did the dad bring a ladder to the bar?",
    answer: "Because he heard drinks were on the house!",
    owner: "Ryan",
  },
  {
    question: "What do you call cheese that isn't yours?",
    answer: "Nacho Cheese!",
    owner: "Ryan",
  },
  {
    question: "My wife said I should do lunges to stay in shape...",
    answer: "That would be a big step forward.",
    owner: "Ryan",
  },
  {
    question: "If April showers bring May flowers, what do May flowers bring?",
    answer: "Pilgrims",
    owner: "Ryan",
  },
  {
    question:
      "Why do fathers take an extra pair of socks when they go golfing?",
    answer: "In case they get a hole in one!",
    owner: "Ryan",
  },
];

const JokesApp: React.FC = () => {
  const [remainingJokes, setRemainingJokes] = useState<Joke[]>([...jokes]);
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isFunny, setIsFunny] = useState<boolean>(false);
  const [funnyVotes, setFunnyVotes] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);

  useEffect(() => {
    if (remainingJokes.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingJokes.length);
      setCurrentJoke(remainingJokes[randomIndex]);
      setShowAnswer(false);
      setHasVoted(false);
      setIsFunny(false);
    } else {
      setShowResult(true);
    }
  }, [remainingJokes]);

  const playFunnyAudio = () => {
    const audio = new Audio("/laugh.m4a"); // Path to your audio file
    audio.play();
  };

  const playWompAudio = () => {
    const audio = new Audio("/womp.m4a"); // Path to your audio file
    audio.play();
  };

  const handleVote = (funny: boolean) => {
    if (funny && currentJoke) {
      playFunnyAudio();
      setIsFunny(true);
      setFunnyVotes({
        ...funnyVotes,
        [currentJoke.owner]: (funnyVotes[currentJoke.owner] || 0) + 1,
      });
    }
    if (!funny) {
      playWompAudio();
    }
    setHasVoted(true);
  };

  const goToNextJoke = () => {
    setRemainingJokes(remainingJokes.filter((joke) => joke !== currentJoke));
  };

  const getWinner = (): string => {
    return Object.keys(funnyVotes).reduce(
      (a, b) => (funnyVotes[a] > funnyVotes[b] ? a : b),
      ""
    );
  };

  return (
    <>
      {showResult && <Particles onComplete={() => {}} />}
      <Container>
        {!started ? (
          <Flex
            justify="center"
            align="center"
            height="100vh"
            direction="column"
          >
            <Text color="white" fontSize="lg" mb={4} >
              <Box fontSize="x-large" as="strong">Ishmael</Box>, you&apos;re going to be a dad, again, soon. It is in your nature to recognize a decent dad joke when you read one. This test will determine who amongst your coworkers is best dad joke teller of them all.</Text>
              <Text color="white" fontSize="lg" mb={16} >
                You must first guess the answer before you can see it. Then you must vote if it is funny or not. The winner will be the one who tells the most funny jokes.
              </Text>
            <Button borderRadius="full" size="lg" onClick={() => setStarted(true)}>Let&apos;s get started</Button>
          </Flex>
        ) : (
          <Flex
            justify="center"
            align="center"
            height="100vh"
            direction="column"
          >
            <VStack
              position="relative"
              bg="white"
              spacing={4}
              boxShadow="2xl"
              padding={16}
              borderRadius={16}
            >
              <Box
                position="absolute"
                zIndex={-1}
                top="-220px"
                opacity={isFunny ? 1 : 0}
                
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: isFunny ? 1 : 0 }}
                  transition={springIsh}
                >
                  <Image
                    alt="ishmael"
                    src="/ish.png"
                    width={1936}
                    height={1296}
                  />
                </motion.div>
              </Box>
              {showResult ? (
                <Box textAlign="center">
                  <Text fontSize="xl">Best Dad Joke Teller</Text>
                  <Text fontSize="2xl">
                    <strong>{getWinner()}</strong>
                  </Text>
                </Box>
              ) : (
                currentJoke && (
                  <Box>
                    <Text whiteSpace="pre-line" fontSize="2xl">
                      {currentJoke.question}
                    </Text>

                    <Box
                      borderBottom="3px solid"
                      borderColor="cyan.900"
                      px={2}
                      mt={4}
                    >
                      <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: showAnswer ? 1 : 0.5 }}
                        transition={spring}
                      >
                        <Text opacity={showAnswer ? 1 : 0} fontSize="2xl">
                          {currentJoke.answer}
                        </Text>
                      </motion.div>
                    </Box>
                  </Box>
                )
              )}
            </VStack>
            <HStack spacing={2} mt={4}>
              {showAnswer && (
                <>
                  {!hasVoted && (
                    <>
                      <Button
                        colorScheme="blackAlpha"
                        onClick={() => handleVote(true)}
                        borderRadius="full"
                        variant="outline"
                        size="lg"
                      >
                        Funny
                      </Button>
                      <Button
                        colorScheme="blackAlpha"
                        onClick={() => handleVote(false)}
                        borderRadius="full"
                        variant="outline"
                        size="lg"
                      >
                        Not Funny
                      </Button>
                    </>
                  )}
                  {hasVoted && !showResult && (
                    <Button
                      onClick={goToNextJoke}
                      colorScheme="blue"
                      borderRadius="full"
                    >
                      Next Joke
                    </Button>
                  )}
                </>
              )}
              {!showAnswer && !showResult && (
                <Button
                  colorScheme="blue"
                  borderRadius="full"
                  m={2}
                  onClick={() => setShowAnswer(true)}
                >
                  Show Answer
                </Button>
              )}
            </HStack>
          </Flex>
        )}
      </Container>
    </>
  );
};

export default JokesApp;
