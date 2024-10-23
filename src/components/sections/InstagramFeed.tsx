// File: src/components/InstagramFeed.tsx

import React, { useEffect, useState } from "react";

interface InstagramPost {
  shortcode: string;
}

const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [error, setError] = useState<string | null>(null);
  const instagramUsername = "dhssandd";
  const numberOfPosts = 6;

  /**
   * Fetch Instagram posts using the public profile's JSON data.
   */
  const fetchInstagramPosts = async () => {
    try {
      const response = await fetch(
        `https://www.instagram.com/${instagramUsername}/?__a=1&__d=dis`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!response.ok) {
        setError("Failed to fetch Instagram posts.");
        throw new Error("Failed to fetch Instagram posts.");
      }

      const data = await response.json();
      const posts = data.graphql.user.edge_owner_to_timeline_media.edges
        .slice(0, numberOfPosts)
        .map((edge: any) => ({
          shortcode: edge.node.shortcode,
        }));

      setPosts(posts);
    } catch (err) {
      console.error(err);
      setError("Failed to load Instagram feed.");
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  return (
    <div className="container mx-auto">
      <h1
        className="my-4 text-center text-6xl font-bold"
        style={{
          textShadow: "-2px -2px 2px #CC0033",
        }}
      >
        Keep up with us on Instagram!
      </h1>
      <div id="instagram-feed" className="flex flex-wrap justify-center gap-6">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          posts.map((post) => (
            <iframe
              key={post.shortcode}
              src={`https://www.instagram.com/embed/${post.shortcode}`}
              className="instagram-post w-80"
              frameBorder="0"
              scrolling="no"
              allowTransparency={true}
            ></iframe>
          ))
        )}
      </div>
    </div>
  );
};

export default InstagramFeed;
