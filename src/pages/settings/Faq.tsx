import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs } from "@/data";

const Faq = () => {
  return (
    <div className="p-0 mt-8 mb-12">
      <h4 className="text-xl text-[#2E7D32] mb-4 underline">
        Frequently Asked Questions
      </h4>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-0"
      >
        {faqs.map((faq, idx) => (
          <AccordionItem value={`item-${idx}`} key={idx}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2 text-balance">
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Faq;
