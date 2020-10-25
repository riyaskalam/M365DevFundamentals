import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SkillsReactv1WebPartStrings';
import SkillsReactv1 from './components/SkillsReactv1';
import { ISkillsReactv1Props } from './components/ISkillsReactv1Props';

export interface ISkillsReactv1WebPartProps {
  description: string;
}

export default class SkillsReactv1WebPart extends BaseClientSideWebPart<ISkillsReactv1WebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISkillsReactv1Props> = React.createElement(
      SkillsReactv1,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
