export const getFirstThreeSentences = (content) => {
    const sentences = content.split(/[.;]/);
    const firstThreeSentences = sentences.slice(0, 3).join('. ') + '.';
    return firstThreeSentences;
};


