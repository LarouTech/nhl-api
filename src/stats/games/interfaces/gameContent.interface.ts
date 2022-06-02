export interface GameContent {
  link: string;
  editorial: {
    preview: {
      title: string;
      topicList: string;
      items: {
        type: string;
        state: string;
        date: string;
        id: string;
        headline: string;
        subhead: string;
        seoTitle: string;
        seoDescription: string;
        seoKeywords: string;
        slug: string;
        commenting: boolean;
        tagline: string;
        tokenData: {
          [key: string]: {
            tokenGUI: string;
            type: string;
            href: string;
            hrefMobile: string;
          };
        };
        contributor: {
          contributors: { name: string; twitter: string }[];
          source: string;
        };
        keywordDisplay: {
          type: string;
          value: string;
          displayName: string;
        }[];
        approval: string;
        url: string;
        dataURI: string;
        primaryKeyword: {
          type: string;
          value: string;
          displayName: string;
        };
        shareImage: string;
        media: {
          type: string;
          image: {
            title: string;
            altText: string;
            cuts: {
              '2568x1444': Cut;
              '2208x1242': Cut;
              '2048x1152': Cut;
              '1704x960': Cut;
              '1536x864': Cut;
              '1284x722': Cut;
              '1136x640': Cut;
              '1024x576': Cut;
              '960x540': Cut;
              '768x432': Cut;
              '640x360': Cut;
              '568x320': Cut;
              '372x210': Cut;
              '320x180': Cut;
              '248x140': Cut;
              '124x70': Cut;
            };
          };
        };
        preview: string;
      }[];
    };
    articles: {
      title: string;
      topicList: string;
      item: any[];
    };
    recap: {
      title: string;
      topicList: string;
      items: any[];
    };
  };
  media: {
    epg: {
      title: string;
      platform: string;
      items: {
        guid: string;
        mediaState: string;
        mediaPlaybackId: string;
        mediaFeedType: string;
        callLetters: string;
        eventId: string;
        language: string;
        freeGame: string;
        feedName: string;
        gamePlus: string;
        externalId: number[];
      }[];
    }[];
    milestones: {
      title: string;
      streamStart: SVGStringList;
      items: {
        title: string;
        description: string;
        type: string;
        timeAbsolute: string;
        timeOffset: string;
        period: string;
        statsEventId: string;
        teamId: string;
        playerId: string;
        periodTime: string;
        ordinalNum: string;
        highlight: {
          type: string;
          id: string;
          date: string;
          title: string;
          blurb: string;
          description: string;
          duration: string;
          authFlow: boolean;
          mediaPlaybackId: string;
          mediaState: string;
          keywords: {
            type: string;
            value: string;
            displayName: string;
          }[];
          image: {
            title: string;
            altText: string;
            cuts: {
              '1136x640': Cut;
              '1024x576': Cut;
              '960x540': Cut;
              '768x432': Cut;
              '640x360': Cut;
              '568x320': Cut;
              '372x210': Cut;
              '320x180': Cut;
              '248x140': Cut;
              '124x70': Cut;
            };
          };
          playbacks: {
            name: string;
            width: string;
            height: string;
            url: string;
          }[];
        };
      }[];
    };
  };
  highlights: {
    scoreboard: {
      title: string;
      topicList: string;
      items: {
        type: string;
        id: string;
        date: string;
        title: string;
        description: string;
        duration: string;
        authFlow: boolean;
        mediaPlaybackId: string;
        mediaState: string;
        keyword: {
          type: string;
          value: string;
          displayName: string;
        }[];
        image: {
          title: string;
          altText: string;
          cuts: {
            '2568x1444': Cut;
            '2208x1242': Cut;
            '2048x1152': Cut;
            '1704x960': Cut;
            '1536x864': Cut;
            '1284x722': Cut;
            '1136x640': Cut;
            '1024x576': Cut;
            '960x540': Cut;
            '768x432': Cut;
            '640x360': Cut;
            '568x320': Cut;
            '372x210': Cut;
            '320x180': Cut;
            '248x140': Cut;
            '124x70': Cut;
          };
        };
        playbacks: {
          name: string;
          width: string;
          height: string;
          url: string;
        }[];
      }[];
    };
  };
}

export interface Cut {
  aspectRatio: string;
  width: number;
  height: number;
  src: string;
  at2x: string;
  at3x: string;
}
