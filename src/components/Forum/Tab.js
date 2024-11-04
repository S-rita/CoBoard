import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import InfoPanel from './InfoPanel';
import SharePanel from './SharePanel';
import SettingPanel from './SettingPanel';
import { fetchTopics } from '../../api';
import { UserContext } from '../../UserContext';

const Tab = ({ board, forum_name }) => {
  const [isInfoPanelVisible, setInfoPanelVisible] = useState(false);
  const [isSharePanelVisible, setSharePanelVisible] = useState(false);
  const [isSettingPanelVisible, setSettingPanelVisible] = useState(false);
  const navigate = useNavigate();
  const { user, status } = useContext(UserContext);
  const [creator_id, setCreatorID] = useState('12345678');
  const id = status === "se" ? user.sid : user.aid;

  useEffect(() => {
    const loadTopics = async () => {
        try {
          const response = await fetchTopics(board, forum_name);
          setCreatorID(response.creator_id);
        } catch (error) {
          console.error("Failed to load topics", error);
        }
    };

    loadTopics();
  }, [board, forum_name]);

  const openInfoPanel = () => {
    setInfoPanelVisible(true);
  };

  const closeInfoPanel = () => {
    setInfoPanelVisible(false);
  };

  const openBookmarkPanel = () => {
    alert('Opening Bookmark Panel');
  };

  const openSharePanel = () => {
    setSharePanelVisible(true);
  };

  const closeSharePanel = () => {
    setSharePanelVisible(false);
  };

  const openSettingPanel = () => {
    setSettingPanelVisible(true);
    navigate(`/coboard/${board}/${forum_name}/setting`);
  };

  const closeSettingPanel = () => {
    setSettingPanelVisible(false);
    navigate(`/coboard/${board}/${forum_name}`);
  };

  return (
    <>
      <div className="flex-shrink-0 w-20 min-h-screen bg-salmon items-center fixed right-0">
        <div className="flex flex-col w-20 min-h-screen bg-salmon items-center">
          <button type="button" onClick={() => alert('User button clicked')} className="w-10 h-10 mt-12">
            <img src="/asset/user_button.svg" alt="User Button" />
          </button>
          <button type="button" onClick={openInfoPanel} className="w-12 h-12 mt-16">
            <img src="/asset/i_button.svg" alt="Info Button" />
          </button>
          <button type="button" onClick={openBookmarkPanel} className="w-12 h-12 mt-10">
            <img src="/asset/bookmark_button.svg" alt="Bookmark Button" />
          </button>
          <button type="button" onClick={openSharePanel} className="w-12 h-12 mt-10">
            <img src="/asset/share_button.svg" alt="Share Button" />
          </button>
          {creator_id === id && (
            <button type="button" onClick={openSettingPanel} className="w-12 h-12 mt-10">
              <img src="/asset/setting_button.svg" alt="Setting Button" />
            </button>
          )}
        </div>
      </div>

      <InfoPanel 
        isVisible={isInfoPanelVisible} 
        closeInfoPanel={closeInfoPanel}
        board = {board}
        forum_name = {forum_name} 
      />
      <SharePanel isVisible={isSharePanelVisible} closeSharePanel={closeSharePanel} />
      <SettingPanel 
        isVisible={isSettingPanelVisible} 
        closeSettingPanel={closeSettingPanel}
        board = {board}
        forum_name = {forum_name} 
      />
    </>
  );
};

export default Tab;
