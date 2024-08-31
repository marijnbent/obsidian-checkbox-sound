import { Plugin } from 'obsidian';
import { CheckboxSoundSettingTab } from './settings';
import { CheckboxSoundSettings, DEFAULT_SETTINGS } from './types';

export default class CheckboxSound extends Plugin {
    settings: CheckboxSoundSettings;

    async onload() {

        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        this.addSettingTab(new CheckboxSoundSettingTab(this.app, this));
        
        // this.addCommand({
        //     id: '',
        //     name: '',
        //     callback: () => null
        // });

        // this.addRibbonIcon('printer', 'Print Note', (evt: MouseEvent) => {
        // });
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}