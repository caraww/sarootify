import React from "react";

const Mixer = ({ canMix, isMixing, onMix, recommendation }) => {
  if (!canMix) return null;

  return (
    <div className="mixer">
      <button disabled={isMixing} onClick={onMix}>
        برو بریم
      </button>

      {recommendation && (
        <div className="recommendation"> 🎧 {recommendation} : پیشنهاد من</div>
      )}
    </div>
  );
};
export default Mixer;
