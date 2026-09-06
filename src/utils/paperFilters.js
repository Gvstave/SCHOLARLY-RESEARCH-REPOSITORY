export function getPaperInstitution(paper) {
    return paper.profiles?.institution || 'Independent / Other';
}

export function matchesPaperSearch(paper, query) {
    const normalizedQuery = query.trim().toLowerCase();
    return [
        paper.title,
        paper.abstract,
        paper.profiles?.full_name,
        paper.profiles?.institution,
        paper.category,
    ].some((value) => (value || '').toLowerCase().includes(normalizedQuery));
}

export function matchesInstitution(paper, institution) {
    if (institution === 'All') return true;
    const paperInstitution = getPaperInstitution(paper);
    return paperInstitution === institution || (
        institution === 'Independent / Other' && paperInstitution === 'Independent'
    );
}
