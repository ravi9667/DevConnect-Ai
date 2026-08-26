import { User } from '../models/user.model.js';

export const generateUniqueUsername = async (baseUsername) => {
    let username = baseUsername;
    let counter = 1;

    while (await User.exists({ username })) {
        username = `${baseUsername}_${counter}`;
        counter++;
    }

    return username;
};


export const generateUniqueUsernameSuggestions = async ( baseUsername, count = 2 ) => {
    const suggestions = [];
    let counter = 1;

    while (suggestions.length < count) {
        const username = `${baseUsername}_${counter}`;

        if (!(await User.exists({ username }))) {
            suggestions.push(username);
        }

        counter++;
    }

    return suggestions;
};