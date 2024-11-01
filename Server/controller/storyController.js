
import Story from '../model/storySchema.js';

export const searchStories =async (req, res) => {
    const { q, page = 1, limit = 10 } = req.query;
    const keyword = q ? q.toLowerCase() : '';
    let filteredStories = await Story.find({});

    // Keyword search
    if (keyword) {
        filteredStories = filteredStories.filter(story =>
            story.title.toLowerCase().includes(keyword) || story.content.toLowerCase().includes(keyword)
        );
    }

    // Sorting
    filteredStories.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = filteredStories.slice(startIndex, endIndex);

    // Highlighting matching keywords
    const highlightedResults = results.map(story => {
        const highlightedTitle = story.title.replace(new RegExp(`(${keyword})`, 'gi'), '<strong>$1</strong>');
        const highlightedContent = story.content.replace(new RegExp(`(${keyword})`, 'gi'), '<strong>$1</strong>');
        return { ...story, title: highlightedTitle, content: highlightedContent };
    });

    res.json({
        total: filteredStories.length,
        page: parseInt(page),
        limit: parseInt(limit),
        stories: highlightedResults,
    });
};



export const createStories = async (req, res) => {
    try {
        const storiesArray = req.body; 

        if (!Array.isArray(storiesArray)) {
            return res.status(400).json({ message: 'Invalid input: expected an array of stories.' });
        }

        const createdStories = await Story.insertMany(storiesArray);
      
        return res.status(201).json({
            message: 'Stories created successfully',
            stories: createdStories
        });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating stories', error });
    }
};

