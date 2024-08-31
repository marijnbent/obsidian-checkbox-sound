import { App, PluginSettingTab, Setting } from 'obsidian';
import CheckboxSound from './main';

export class CheckboxSoundSettingTab extends PluginSettingTab {
    plugin: CheckboxSound;

    constructor(app: App, plugin: CheckboxSound) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl).setName('Checkbox Sound').setHeading();

        new Setting(containerEl)
            .setName('Play Sound On Check')
            .setDesc('With description.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.playSoundOnTick)
                .onChange(async (value) => {
                    this.plugin.settings.playSoundOnTick = value;
                    await this.plugin.saveSettings();
                }));
    }
}