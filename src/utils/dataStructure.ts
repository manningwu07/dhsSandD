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
            description: string[];
          }>;
        };
        videoOne: {
          src: string;
          title: string;
          description: string;
        };
        videoTwo: {
          src: string;
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
            content: string | string[];
          }>;
        }>;
        calendarLink: string;
        formsToComplete: string[];
        eligibilityRules: string[];
        submissionDetails: {
          email: string;
          physicalSubmission: string;
        };
      };
    };
  }
  

// For adminUI when pulling from DB to turn into DataStructure
export function transformFullContent(fullContent: any): DataStructure {
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
          students: (fullContent.board?.students || []).map((student: any) => ({
            name: student.name || "",
            position: student.position || "",
            department: student.department || "",
            imageSrc: student.imageSrc || ""
          })),
          parents: (fullContent.board?.parents || []).map((parent: any) => ({
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
          events: (fullContent.clubEvents?.events || []).map((event: any) => ({
            date: event.date || "",
            title: event.title || ""
          }))
        },
        landing: {
          card: (fullContent.landing?.card || []).map((card: any) => ({
            src: card.src || "",
            header: card.header || "",
            description: card.description || "",
            link: card.link || ""
          })),
          description: {
            card: (fullContent.landing?.description?.card || []).map((card: any) => ({
              src: card.src || "",
              alt: card.alt || "",
              header: card.header || "",
              description: card.description || ""
            })),
            paragraphs: (fullContent.landing?.description?.paragraphs || []).map((paragraph: any) => ({
              paragraph: paragraph.paragraph || ""
            }))
          }
        },
        parents: {
          title: fullContent.parents?.title || "",
          mentorGuide: {
            title: fullContent.parents?.mentorGuide?.title || "",
            description: fullContent.parents?.mentorGuide?.description || "",
            accordionItems: (fullContent.parents?.mentorGuide?.accordionItems || []).map((item: any) => ({
              title: item.title || "",
              description: item.description || []
            }))
          },
          videoOne: {
            src: fullContent.parents?.videoOne?.src || "",
            title: fullContent.parents?.videoOne?.title || "",
            description: fullContent.parents?.videoOne?.description || ""
          },
          videoTwo: {
            src: fullContent.parents?.videoTwo?.src || "",
            title: fullContent.parents?.videoTwo?.title || "",
            description: fullContent.parents?.videoTwo?.description || ""
          },
          additionalResourcesLinks: (fullContent.parents?.additionalResourcesLinks || []).map((link: any) => ({
            link: link.link || "",
            title: link.title || ""
          }))
        },
        tournament: {
          signUpInstructions: (fullContent.tournament?.signUpInstructions || []).map((instruction: any) => ({
            title: instruction.title || "",
            description: instruction.description || "",
            accordionItems: (instruction.accordionItems || []).map((item: any) => ({
              trigger: item.trigger || "",
              content: item.content || ""
            }))
          })),
          calendarLink: fullContent.tournament?.calendarLink || "",
          formsToComplete: fullContent.tournament?.formsToComplete || [],
          eligibilityRules: fullContent.tournament?.eligibilityRules || [],
          submissionDetails: {
            email: fullContent.tournament?.submissionDetails?.email || "",
            physicalSubmission: fullContent.tournament?.submissionDetails?.physicalSubmission || ""
          }
        }
      }
    };
  }
  