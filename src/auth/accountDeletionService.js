import { DEFAULT_PROFILES } from '../constants/seedData';
import { getStorageItem, setStorageItem } from '../utils/localStorageHelper';
import { clearActiveProfile } from './profileService';

export function clearUserData(userId) {
  const profiles = getStorageItem('profiles', DEFAULT_PROFILES);
  const papers = getStorageItem('papers', []);
  const deletedPaperIds = new Set(
    papers.filter((paper) => paper.author_id === userId).map((paper) => String(paper.id))
  );
  const downloadLogs = getStorageItem('downloads_logs', []);
  const collaboratorMap = getStorageItem('paper_collaborators_junction', {});

  setStorageItem('profiles', profiles.filter((profile) => profile.id !== userId));
  setStorageItem('papers', papers.filter((paper) => paper.author_id !== userId));
  setStorageItem('downloads_logs', downloadLogs.filter((log) => log.user_id !== userId));
  setStorageItem(
    'paper_collaborators_junction',
    Object.fromEntries(
      Object.entries(collaboratorMap).filter(([paperId]) => !deletedPaperIds.has(String(paperId)))
    )
  );
  clearActiveProfile();
}
