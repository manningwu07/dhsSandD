// Modify the datastructure to match the website 

// Disclaimers
// DO NOT USE ARRAYS, IF YOU NEED TO, MAKE THE ELEMENTS OBJECTS WITH 1 ATTRBUTES
// THIS DOES NOT AFFECT NAVBAR/FOOTER ITEMS
// DOES NOT MOBILE DESIGN ADAPT

// Other helpful things
// src, imageSrc will prompt image uploading
// Links are manually made in the pages (set <Link href ={item.link}>content</Link>)
// It may not render for you when u check it out on the main; thats cuz theres caches. Just trust it works C:

export interface DataStructure {
    components: {
      hero: {
        title: string;
        description: string;
        buttonLink: string;
      };
    };
    pages: {
      about: {
        introduction: {
          title: string;
          description: string;
          imageSrc: string;
        };
        whySpeechAndDebate: {
          title: string;
          description: string;
          whySpeech: {
            title: string;
            description: string;
          };
          whyDebate: {
            title: string;
            description: string;
          };
        };
        parentWeNeedYou: {
          title: string;
          description: string;
          callToAction: string;
          link: string;
        };
      };
      board: {
        students: Array<{
          name: string;
          position: string;
          department: string;
          imageSrc: string;
        }>;
        parents: Array<{
          name: string;
          position: string;
          department: string;
          imageSrc: string;
        }>;
      };
      clubEvents: {
        title: string;
        description: string;
        calendarLink: string;
        events: Array<{
          date: string;
          title: string;
        }>;
      };
      landing: {
        card: Array<{
          src: string;
          header: string;
          description: string;
          link: string;
        }>;
        description: {
          card: Array<{
            src: string;
            alt: string;
            header: string;
            description: string;
          }>;
          paragraphs: Array<{
            paragraph: string;
          }>;
        };
      };
      parents: {
        title: string;
        mentorGuide: {
          title: string;
          description: string;
          accordionItems: Array<{ 
            title: string;
            description: Array<{
              paragraph: string;
            }>;
          }>;
        };
        videoOne: {
          link: string;
          title: string;
          description: string;
        };
        videoTwo: {
          link: string;
          title: string;
          description: string;
        };
        additionalResourcesLinks: Array<{
          link: string;
          title: string;
        }>;
      };
      tournament: {
        signUpInstructions: Array<{
          title: string;
          description: string;
          accordionItems: Array<{
            trigger: string;
            content: string | Array<{
              paragraph: string;
            }>;
          }>;
        }>;
        calendarLink: string;
        formsToComplete: Array<{
          paragraph: string;
        }>;
        eligibilityRules: Array<{
          paragraph: string;
        }>;
        submissionDetails: {
          email: string;
          physicalSubmission: string;
        };
      };
    };
  }
  

// For adminUI when pulling from DB to turn into DataStructure
export function transformFullContent(fullContent: fullContentStructure): DataStructure {
  return {
      components: {
          hero: {
              title: fullContent.components?.hero?.title || "",
              description: fullContent.components?.hero?.description || "",
              buttonLink: fullContent.components?.hero?.buttonLink || ""
          }
      },
      pages: {
          about: {
              introduction: {
                  title: fullContent.about?.introduction?.title || "",
                  description: fullContent.about?.introduction?.description || "",
                  imageSrc: fullContent.about?.introduction?.imageSrc || ""
              },
              whySpeechAndDebate: {
                  title: fullContent.about?.whySpeechAndDebate?.title || "",
                  description: fullContent.about?.whySpeechAndDebate?.description || "",
                  whySpeech: {
                      title: fullContent.about?.whySpeechAndDebate?.whySpeech?.title || "",
                      description: fullContent.about?.whySpeechAndDebate?.whySpeech?.description || ""
                  },
                  whyDebate: {
                      title: fullContent.about?.whySpeechAndDebate?.whyDebate?.title || "",
                      description: fullContent.about?.whySpeechAndDebate?.whyDebate?.description || ""
                  }
              },
              parentWeNeedYou: {
                  title: fullContent.about?.parentWeNeedYou?.title || "",
                  description: fullContent.about?.parentWeNeedYou?.description || "",
                  callToAction: fullContent.about?.parentWeNeedYou?.callToAction || "",
                  link: fullContent.about?.parentWeNeedYou?.link || ""
              }
          },
          board: {
              students: (fullContent.board?.students || []).map((student) => ({
                  name: student.name || "",
                  position: student.position || "",
                  department: student.department || "",
                  imageSrc: student.imageSrc || ""
              })),
              parents: (fullContent.board?.parents || []).map((parent) => ({
                  name: parent.name || "",
                  position: parent.position || "",
                  department: parent.department || "",
                  imageSrc: parent.imageSrc || ""
              }))
          },
          clubEvents: {
              title: fullContent.clubEvents?.title || "",
              description: fullContent.clubEvents?.description || "",
              calendarLink: fullContent.clubEvents?.calendarLink || "",
              events: (fullContent.clubEvents?.events || []).map((event) => ({
                  date: event.date || "",
                  title: event.title || ""
              }))
          },
          landing: {
              card: (fullContent.landing?.card || []).map((card) => ({
                  src: card.src || "",
                  header: card.header || "",
                  description: card.description || "",
                  link: card.link || ""
              })),
              description: {
                  card: (fullContent.landing?.description?.card || []).map((card) => ({
                      src: card.src || "",
                      alt: card.alt || "",
                      header: card.header || "",
                      description: card.description || ""
                  })),
                  paragraphs: (fullContent.landing?.description?.paragraphs || []).map((paragraph) => ({
                      paragraph: paragraph.paragraph || ""
                  }))
              }
          },
          parents: {
              title: fullContent.parents?.title || "",
              mentorGuide: {
                  title: fullContent.parents?.mentorGuide?.title || "",
                  description: fullContent.parents?.mentorGuide?.description || "",
                  accordionItems: (fullContent.parents?.mentorGuide?.accordionItems || []).map((item) => ({
                      title: item.title || "",
                      description: (item.description || []).map((desc) => ({
                          paragraph: desc || ""
                      }))
                  }))
              },
              videoOne: {
                  link: fullContent.parents?.videoOne?.link || "",
                  title: fullContent.parents?.videoOne?.title || "",
                  description: fullContent.parents?.videoOne?.description || ""
              },
              videoTwo: {
                  link: fullContent.parents?.videoTwo?.link || "",
                  title: fullContent.parents?.videoTwo?.title || "",
                  description: fullContent.parents?.videoTwo?.description || ""
              },
              additionalResourcesLinks: (fullContent.parents?.additionalResourcesLinks || []).map((link) => ({
                  link: link.link || "",
                  title: link.title || ""
              }))
          },
          tournament: {
              signUpInstructions: (fullContent.tournament?.signUpInstructions || []).map((instruction) => ({
                  title: instruction.title || "",
                  description: instruction.description || "",
                  accordionItems: (instruction.accordionItems || []).map((item) => ({
                      trigger: item.trigger || "",
                      content: Array.isArray(item.content)
                          ? item.content.map((content) => ({ paragraph: content }))
                          : item.content || ""
                  }))
              })),
              calendarLink: fullContent.tournament?.calendarLink || "",
              formsToComplete: (fullContent.tournament?.formsToComplete || []).map((form) => ({
                  paragraph: form.paragraph || ""
              })),
              eligibilityRules: (fullContent.tournament?.eligibilityRules || []).map((rule) => ({
                  paragraph: rule.paragraph || ""
              })),
              submissionDetails: {
                  email: fullContent.tournament?.submissionDetails?.email || "",
                  physicalSubmission: fullContent.tournament?.submissionDetails?.physicalSubmission || ""
              }
          }
      }
  };
}



export interface fullContentStructure {
  about: About;
  board: Board;
  clubEvents: ClubEvents;
  components: Components;
  landing: Landing;
  parents: Parents;
  tournament: Tournament;
}

interface About {
  introduction: Introduction;
  parentWeNeedYou: ParentWeNeedYou;
  whySpeechAndDebate: WhySpeechAndDebate;
  whyDebate: WhyDebate;
  whySpeech: WhySpeech;
}

interface Introduction {
  description: string;
  imageSrc: string;
  title: string;
}

interface ParentWeNeedYou {
  callToAction: string;
  description: string;
  link: string;
  title: string;
}

interface WhySpeechAndDebate {
  description: string;
  whyDebate: WhyDebate;
  whySpeech: WhySpeech;
  title: string;
}

interface WhyDebate {
  description: string;
  title: string;
}

interface WhySpeech {
  description: string;
  title: string;
}

interface Board {
  parents: Person[];
  students: Person[];
}

interface Person {
  department: string;
  imageSrc: string;
  name: string;
  position: string;
}

interface ClubEvents {
  calendarLink: string;
  description: string;
  events: Event[];
  title: string;
}

interface Event {
  date: string;
  title: string;
}

interface Components {
  hero: Hero;
}

interface Hero {
  buttonLink: string;
  description: string;
  title: string;
}

interface Landing {
  card: Card[];
  description: LandingDescription;
}

interface Card {
  description: string;
  header: string;
  link: string;
  src: string;
}

interface LandingDescription {
  card: DescriptionCard[];
  paragraphs: Paragraph[];
}

interface DescriptionCard {
  alt: string;
  description: string;
  header: string;
  src: string;
}

interface Paragraph {
  paragraph: string;
}

interface Parents {
  title: string;
  additionalResourcesLinks: ResourceLink[];
  mentorGuide: MentorGuide;
  videoOne: Video;
  videoTwo: Video;
}

interface ResourceLink {
  link: string;
  title: string;
}

interface MentorGuide {
  title: string;
  description: string;
  accordionItems: AccordionItem[];
}

interface AccordionItem {
  title: string;
  description: string[];
}

interface Video {
  description: string;
  link: string;
  title: string;
}

interface Tournament {
  calendarLink: string;
  eligibilityRules: Paragraph[];
  formsToComplete: Paragraph[];
  signUpInstructions: SignUpInstruction[];
  submissionDetails: SubmissionDetails;
}

interface SignUpInstruction {
  title: string;
  description: string;
  accordionItems: AccordionContent[];
}

interface AccordionContent {
  trigger: string;
  content: string | string[];
}

interface SubmissionDetails {
  email: string;
  physicalSubmission: string;
}
