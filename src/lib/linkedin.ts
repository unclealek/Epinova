import { format } from 'date-fns';

export interface LinkedInPost {
  id: string;
  text: string;
  created: string;
  author: {
    name: string;
    image: string;
  };
}

export async function getLinkedInPosts(accessToken: string): Promise<LinkedInPost[]> {
  try {
    const response = await fetch(
      'https://api.linkedin.com/v2/ugcPosts?q=authors&authors={www.linkedin.com/in/kelvin-aliche}',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch LinkedIn posts');
    }

    const data = await response.json();
    
    return data.elements.map((post: any) => ({
      id: post.id,
      text: post.specificContent['com.linkedin.ugc.ShareContent'].shareCommentary.text,
      created: format(new Date(post.created.time), 'yyyy-MM-dd'),
      author: {
        name: 'Your Name', // This should be fetched from LinkedIn profile
        image: 'https://i.pravatar.cc/150?u=linkedin' // This should be fetched from LinkedIn profile
      }
    }));
  } catch (error) {
    console.error('Error fetching LinkedIn posts:', error);
    return [];
  }
}