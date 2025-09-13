// import Heading from "../ui/Heading";

// function AdminFaq() {
//   return <Heading as="h1">Admin Faq/Help</Heading>;
// }

// export default AdminFaq;

import React, { useState } from "react";
import styled from "styled-components";
import { HiChevronUp, HiChevronDown } from "react-icons/hi";

// Styled Components
const FAQSection = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 4rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Segoe UI", sans-serif;

  /* @media (max-width: 768px) {
    flex-direction: column;
  } */
`;

const Left = styled.div`
  flex: 1;
`;

const Tag = styled.div`
  color: #7c3aed;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: 2.7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #111;

  span {
    color: var(--color-brand-400);
  }
`;

const Description = styled.p`
  color: #666;
  font-size: 1.5rem;
  max-width: 400px;
`;

const Right = styled.div`
  flex: 1.2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FAQItem = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 1.2rem 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
`;

const QuestionRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const Question = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  color: #111;
`;

const Answer = styled.p`
  font-size: 1.5rem;
  color: #555;
  margin-top: 0.75rem;
  line-height: 1.6;
`;

const IconButton = styled.button`
  background-color: var(--color-brand-400);
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: var(--color-brand-50);
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${(props) => (props.open ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
  cursor: pointer;
`;

// FAQ Data
const faqs = [
  {
    question: "How do I submit a complaint?",
    answer:
      "Go to the Report section, fill in the required details, and click Submit. You'll receive a confirmation once it's sent.",
  },
  {
    question: "How can I check the status of my complaint?",
    answer:
      "Navigate to the Feedback tab. Each complaint shows its current status — such as Pending, In Review, or Resolved.",
  },
  {
    question: "Can I delete or edit a complaint after submitting?",
    answer:
      "You can delete a complaint if it hasn't been resolved yet. Editing may be restricted, but you can always submit a follow-up.",
  },
  {
    question: "Will my identity be visible to admins?",
    answer:
      "No. Your complaints are anonymous unless you choose to include identifying details. Your privacy is always protected.",
  },
];

// Component
function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <FAQSection>
      <Left>
        <Title>
          Frequently Asked <span>Questions!!</span>
        </Title>
        <Description>
          Have questions? This section covers everything you need to know about
          using your student dashboard — from submitting complaints to checking
          updates and managing your account.
        </Description>
      </Left>

      <Right>
        {faqs.map((faq, i) => (
          <FAQItem key={i}>
            <QuestionRow onClick={() => toggle(i)}>
              <Question>{faq.question}</Question>
              <IconButton open={activeIndex === i}>
                {activeIndex === i ? <HiChevronUp /> : <HiChevronDown />}
              </IconButton>
            </QuestionRow>
            {activeIndex === i && <Answer>{faq.answer}</Answer>}
          </FAQItem>
        ))}
      </Right>
    </FAQSection>
  );
}

export default Faq;
