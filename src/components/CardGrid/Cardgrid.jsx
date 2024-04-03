import React, { useEffect, useState } from "react";
import "./Cardgrid.scss";
import LinkCard from "./LinkCard";
import DeleteLink from "../Modal/DeleteLink";
import AddToFolder from "../Modal/AddToFolder";
import { getFolders } from "../../api";

const CardGrid = ({ formattedCards, searchText }) => {
  const [showDeleteLinkModal, setShowDeleteLinkModal] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [folders, setFolders] = useState([]);
  const [selectedUrl, setSelectedUrl] = useState("");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await getFolders();
        setFolders(response.data);
      } catch (error) {
        console.error("폴더 데이터 불러오기 실패: ", error);
      }
    };
    fetchFolders();
  }, []);

  const openDeleteLinkModal = (url) => {
    setShowDeleteLinkModal(true);
    setSelectedUrl(url);
  };

  const closeDeleteLinkModal = () => {
    setShowDeleteLinkModal(false);
  };

  const openAddFolderModal = (url) => {
    setShowAddFolderModal(true);
    setSelectedUrl(url);
  };

  const closeAddFolderModal = () => {
    setShowAddFolderModal(false);
  };

  const handleDeleteLink = (url) => {
    openDeleteLinkModal(url);
  };

  const handleAddToFolder = (url) => {
    openAddFolderModal(url);
  };

  return (
    <div className="main">
      <div className="card-grid">
        {formattedCards
          .filter(
            (card) =>
              card.url.includes(searchText) ||
              (card.title && card.title.includes(searchText)) ||
              (card.description && card.description.includes(searchText))
          )
          .map((card, index) => (
            <LinkCard
              key={card.id}
              card={card}
              onDeleteLink={handleDeleteLink}
              onAddToFolder={handleAddToFolder}
            />
          ))}
      </div>
      <DeleteLink
        isOpen={showDeleteLinkModal}
        onClose={closeDeleteLinkModal}
        selectedUrl={selectedUrl}
      />
      <AddToFolder
        isOpen={showAddFolderModal}
        onClose={closeAddFolderModal}
        link={selectedUrl}
        categoryList={folders}
      />
    </div>
  );
};

export default CardGrid;
