/**
    * @description      : 
    * @author           : Дом
    * @group            : 
    * @created          : 03/05/2026 - 16:09:20
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/05/2026
    * - Author          : Дом
    * - Modification    : 
**/
// Ждём полной загрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggleButton');
    const statusLabel = document.getElementById('statusLabel');

    // Загружаем сохранённое состояние из хранилища
    chrome.storage.sync.get(['extensionEnabled'], (result) => {
        const isEnabled = result.extensionEnabled ?? true; // По умолчанию true
        toggle.checked = isEnabled;
        statusLabel.textContent = isEnabled ? 'Расширение включено' : 'Расширение выключено';
    });

    // Слушаем переключение состояния
    toggle.addEventListener('change', () => {
        const isEnabled = toggle.checked;
        // Сохраняем новое состояние
        chrome.storage.sync.set({ extensionEnabled: isEnabled });
        statusLabel.textContent = isEnabled ? 'Расширение включено' : 'Расширение выключено';
        console.log(`Состояние изменено на: ${isEnabled}`);
    });
});