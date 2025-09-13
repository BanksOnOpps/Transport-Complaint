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

const Title = styled.h2`
  font-size: 2.7rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: #111;

  span {
    color: var(--color-brand-900);
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
  background-color: var(--color-brand-900);

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
    question: " What is the Admin Dashboard used for?",
    answer:
      "The Admin Dashboard is your central control panel for managing and reviewing student complaints, feedback, and platform activity. It allows you to track issues, respond to students, and oversee reports in real-time.",
  },
  {
    question: "How can I view submitted complaints?",
    answer:
      "Navigate to the Complaints tab to see a list of all submitted complaints. You can filter by status (e.g., Pending, Resolved, Deleted) or search using keywords or student names.",
  },
  {
    question: "Can I respond to or resolve a complaint?",
    answer:
      "Yes. Click the view button beside any complaint to see full details. From there, you can mark it as resolved, leave admin notes, or take further action.",
  },
  {
    question: "How do I filter or sort complaints?",
    answer:
      "Use the filter dropdown or sort options at the top of the complaints table to organize complaints by date, status, or type.",
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
          Frequently asked <span>Questions!!</span>
        </Title>
        <Description>
          Find quick answers to common questions about using the admin
          dashboard, managing complaints, handling student feedback, and
          navigating platform features.
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
