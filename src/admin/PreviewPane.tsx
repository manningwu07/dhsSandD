import { ScrollArea } from '~/components/ui/scroll-area';
import LandingPage from '~/pages/LandingPage';
import AboutPage from '~/pages/about';
import BoardPage from '~/pages/board';
import ParentsPage from '~/pages/parents';
import TournamentPage from '~/pages/tournament';
import ClubEventsPage from '~/pages/club-events';
import type { DataStructure } from '~/utils/dataStructure';
import type { PullContentResult } from '~/utils/pageUtils';

interface PreviewPaneProps {
  data: DataStructure;
  activePage: string;
  width: number;
}

export function PreviewPane({ data, activePage, width }: PreviewPaneProps) {
// Change this to page names
  const renderPreview = () => {
    switch (activePage) {
      case 'landing':
        return (
          <LandingPage
            content={
              {
                landing: data.pages.landing,
                components: data.components,
              } as PullContentResult<'landing'>
            }
          />
        );
      case 'about':
        return (
          <AboutPage
            content={
              {
                about: data.pages.about,
                components: data.components,
              } as PullContentResult<'about'>
            }
          />
        );
      case 'board':
        return (
          <BoardPage
            content={
              {
                board: data.pages.board,
              } as PullContentResult<'board'>
            }
          />
        );
      case 'clubEvents':
        return (
          <ClubEventsPage
            content={
              {
                clubEvents: data.pages.clubEvents,
              } as PullContentResult<'clubEvents'>
            }
          />
        );
      case 'parents':
        return (
          <ParentsPage
            content={
              {
                parents: data.pages.parents,
              } as PullContentResult<'parents'>
            }
          />
        );
      case 'tournament':
        return (
          <TournamentPage
            content={
              {
                tournament: data.pages.tournament,
                components: data.components,
              } as PullContentResult<'tournament'>
            }
          />
        );
      default:
        return (
          <LandingPage
            content={
              {
                landing: data.pages.landing,
                components: data.components,
              } as PullContentResult<'landing'>
            }
          />
        );
    }
  };

  return (
    <div className="bg-white" style={{ width: `${width}%` }}>
      <ScrollArea className="h-full">{renderPreview()}</ScrollArea>
    </div>
  );
}