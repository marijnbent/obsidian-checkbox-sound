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
            .setName('Bool Setting')
            .setDesc('With description.')
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.bool)
                .onChange(async (value) => {
                    this.plugin.settings.bool = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('String Setting')
            .setDesc('With description')
            .addText(text => text
                .setPlaceholder('14px')
                .setValue(this.plugin.settings.string)
                .onChange(async (value) => {
                    this.plugin.settings.string = value;
                    await this.plugin.saveSettings();
                }));

        new Setting(containerEl)
            .setName('Some text')
            .setDesc('With description');

    }
}