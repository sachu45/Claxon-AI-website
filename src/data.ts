import { BrainCircuit, Phone, Bot, ShieldCheck } from 'lucide-react';

export const nav: [string, string][] = [
  ['Platform', 'platform'],
  ['Solutions', 'solutions'],
  ['Agents', 'agents'],
  ['Ecosystem', 'ecosystem'],
  ['Contact', 'contact'],
];

export const facts: [string, string][] = [
  ['Runs alongside your stack', 'Connects to the tools your team already uses instead of asking them to switch.'],
  ['Built for oversight', 'Every action an agent takes is logged and reviewable — nothing runs in a black box.'],
  ['Voice and text agents', 'The same reasoning layer handles calls, chats and internal workflows.'],
];

export const solutions = [
  {
    number: '01',
    title: 'One layer across the business',
    text: 'Customer support, sales, operations and internal tools reasoning over the same context instead of separate bolted-on bots.',
    detail: [
      'One shared memory of the customer, the account and the conversation — not a different bot per team with its own blind spots.',
      'Example: a support agent and a sales agent both see the same open invoice without either one asking the customer to repeat it.',
    ],
    icon: BrainCircuit,
  },
  {
    number: '02',
    title: 'Voice agents that hold a conversation',
    text: 'Inbound and outbound calls handled by an agent that remembers what was said earlier in the call, not just the last line.',
    detail: [
      'Handles interruptions, changes of subject and callbacks without losing the thread of what was already agreed.',
      'Example: a customer calls back an hour later — the agent already knows what was promised and picks up from there.',
    ],
    icon: Phone,
  },
  {
    number: '03',
    title: 'Agents that finish the task',
    text: "Given the right tools and permissions, an agent books the meeting or updates the record — it doesn't stop at a recommendation.",
    detail: [
      'Agents act through the same APIs your team already uses, inside permissions you set — not a generic "connect everything" integration.',
      'Example: a lead is qualified, the CRM record is updated and a calendar hold goes out, in one pass.',
    ],
    icon: Bot,
  },
  {
    number: '04',
    title: 'Reviewable from the start',
    text: 'Permissions, logs and human checkpoints are part of the design, not something bolted on before a security review.',
    detail: [
      'Every action is attributable to a specific run, with the context the agent used to make the call.',
      'Example: set a threshold above which an agent proposes an action and waits for a person to approve it.',
    ],
    icon: ShieldCheck,
  },
];
